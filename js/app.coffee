
class window.Item extends Backbone.Model
	defaults:
		content: 'empty item...'
		done: no

	initialize: -> console.log 'initialized item'
	toggle: -> 
		@save done: !@get('done')
	clear: -> 
		console.log 'hello'
		@destroy()
	remove: () ->
		console.log 'adsfadsf'

class window.ItemList extends Backbone.Collection
	model: Item
	localStorage: new Backbone.LocalStorage('bought2')

	done: ->
		@filter (item) -> item.get('done')

	nextOrder: ->
		return 1 unless @length 
		@last().get('order') + 1

	comparator: (item) -> item.get('order')

	remaining: ->
		@without.apply(@, @done())

window.Items = new ItemList

class window.ItemView extends Backbone.View
	tagName: 'div'

	template: _.template $('#item-template').html()
	events:
		'tap .check': 'toggleDone'
		'doubleTap h2.item': 'edit'
		'keypress .todo-input': 'updateOnEnter'
		'blur .todo-input': 'foo'

	initialize: ->
		@model.bind 'change', @render
		@model.bind 'destroy', @remove

	render: =>
		$(@el).html @template(@model.toJSON())
		@input = @$('.todo-input')
		@

	toggleDone: -> @model.toggle()

	clear: -> @model.clear()

	remove: (item) ->
		console.log item
		console.log 'arg'

	edit: ->
		$(@el).addClass 'editing'
		@input.focus()

	close: =>
		console.log 'CLOSED'
		@model.save content: @input.val()
		$(@el).removeClass 'editing'

	foo: ->
		console.log 'adsfadsf'

	updateOnEnter: (e) =>
		@close() if e.keyCode is 13

class window.AppView extends Backbone.View

	el: $ '#boughtApp'

	events:
		'keypress #new-item': 'createOnEnter'
		'tap button.add': 'createOnClick'
		'tap button.clear': 'clearCompleted'
		'click button.share': 'showContactList'
		'click .modal-overlay': 'dismissContactList'

	initialize: ->
		@input = @$('#new-item')
		
		Items.bind 'add', @addOne
		Items.bind 'reset', @addAll
		Items.bind 'all', @render

		Items.fetch()

	render: =>
		console.log "rendered"

	addOne: (item) =>
		view = new ItemView model: item
		@$('#primary').append view.render().el

	addAll: =>
		Items.each @addOne

	newAttributes: ->
		content: @input.val()
		order: Items.nextOrder()
		done: no

	createOnEnter: (e) =>
		return unless e.keyCode is 13
		Items.create @newAttributes()
		@input.val ''

	createOnClick: (e) =>
		console.log 'hello'
		Items.create @newAttributes()
		@input.val ''

	clearCompleted: (e) =>
		@$('#primary').html('')
		_.each Items.done(), (item) -> 
			console.log "item"
			item.clear()
		@addAll()

	showContactList: ->
		
		$('.modal-overlay').show()
	dismissContactList: (e) ->
		if e.target.className is 'modal-overlay'
			$('.modal-overlay').hide()

window.App = new AppView


