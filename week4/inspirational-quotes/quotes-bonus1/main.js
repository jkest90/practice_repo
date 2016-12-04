$(function() {

	// HTML RENDERING
	var renderQuotes = function() {
		$("#quotes").empty().append(createQuotesList(quotes, filteredAuthor));
	}

	var createQuotesList = function(quotes, filteredAuthor) {
		var list = $('<ul class="list-unstyled">');
		for(var i=0; i<quotes.length; i++) {
			if(!filteredAuthor || quotes[i].author === filteredAuthor) {
				var quoteEl = createQuote(quotes[i], i);
				var item = $('<li>');
				item.append(quoteEl);
				list.append(item);
			}
		}
		return list;
	};

	var createSlimQuote = function(quote) {
		var quoteEl = $('<div class="quote"></div>');
		var quoteTextEl = $('<q class="quote-text">{quote}</q>'.supplant(quote));
		var authorEl = $('<div class="quote-author"><a href="#" class="quote-author-link">-{author}</a></div>'.supplant(quote));

		quoteEl.append(quoteTextEl);
		quoteEl.append(authorEl);

		return quoteEl;
	};

	var createQuote = function(quote, i) {
		var quoteEl = $('<div class="quote clearfix" data-index="{0}"></div>'.supplant([i]));
		var quoteControls = $('<div class="quote-controls"></div>')
		var ratingEl = createRating(quote.rating);
		var deleteEl = $('<a class="quote-delete btn btn-xs btn-danger">&times;</a>');
		var quoteTextEl = $('<q class="quote-text">{quote}</q>'.supplant(quote));
		var authorEl = $('<div class="quote-author"><a href="#" class="quote-author-link">-{author}</a></div>'.supplant(quote));

		quoteEl.append(quoteTextEl);
		quoteEl.append(authorEl);

		quoteControls.append(ratingEl);
		quoteControls.append(deleteEl);
		quoteEl.append(quoteControls);

		return quoteEl;
	};

	var createRating = function(rating) {
		return $(('<div class="quote-rating"><div class="btn-group btn-group-xs" data-toggle="buttons">' + 
  		'<label class="btn btn-default{0}">' + 
	    	'<input type="radio" name="options" id="rating1" value="1">1' + 
	  	'</label>' + 
	  	'<label class="btn btn-default{1}">' + 
	    	'<input type="radio" name="options" id="rating2" value="2">2' + 
	  	'</label>' + 
	  	'<label class="btn btn-default{2}">' + 
	    	'<input type="radio" name="options" id="rating3" value="3">3' + 
	  	'</label>' + 
	  	'<label class="btn btn-default{3}">' + 
	    	'<input type="radio" name="options" id="rating4" value="4">4' + 
	  	'</label>' + 
	  	'<label class="btn btn-default{4}">' + 
	    	'<input type="radio" name="options" id="rating5" value="5">5' + 
	  	'</label>' + 
		'</div></div>').supplant([
			rating === 1 ? ' active' : '',
			rating === 2 ? ' active' : '',
			rating === 3 ? ' active' : '',
			rating === 4 ? ' active' : '',
			rating === 5 ? ' active' : ''
		]));
	};

	var showByAuthor = function(author) {
		$('#author-form-group').addClass('animate-left-collapsed')
		$('#author-shown').removeClass('animate-left-collapsed');
		$('#author-shown-author').text(author);
		$('#inputAuthor').val(author);
		$('#inputQuote').focus();
	};

	var hideByAuthor = function(author) {
		$('#author-form-group').removeClass('animate-left-collapsed')
		$('#author-shown').addClass('animate-left-collapsed');
		$('#inputAuthor').val(author);
		$('#inputAuthor').focus();
	};

	// FORM PROCESSING
	var getQuote = function() {
		return {
			author: $('#inputAuthor').val(),
			quote: $('#inputQuote').val()
		};
	};

	var clearQuoteForm = function() {
		$('#add-quote-form input').val('');
		clearValidation();
		$('#inputAuthor').focus();
	};

	var clearValidation = function() {
		$('#validation-message').addClass('hidden')
		$('#add-quote-form .has-error').removeClass('has-error');
	};

	var validateForm = function() {

		clearValidation();

		var valid = true;

		if($('#inputAuthor').val().length === 0) {
			$('#inputAuthor').parents('.form-group:first').addClass('has-error');
			valid = false;
		}

		if($('#inputQuote').val().length === 0) {
			$('#inputQuote').parents('.form-group:first').addClass('has-error');
			valid = false;

		}
		return valid;
	};

	var displayValidationError = function() {

		$('#validation-message')
			.removeClass('hidden')
			.text('Please fill out all fields.');
	};


	// DATA
	var getQuoteData = function() {
		return JSON.parse(localStorage.quotes || null);
	};

	var saveQuoteData = function() {
		localStorage.quotes = JSON.stringify(quotes);
	};


	// EVENTS
	$('#add-quote-form').submit(function() {
		if(validateForm()) {
			quotes.splice(0,0,getQuote());
			saveQuoteData();
			renderQuotes();
			clearQuoteForm();
		}
		else {
			displayValidationError();
		}
		return false;
	});

	// delete a quote
	$(document).on('click', '.quote-delete', function() {
		$('#random-quote-modal').modal('hide');
		var quote = $(this).parents('.quote:first')
		var index = quote.data('index');
		quotes.splice(index,1);
		saveQuoteData();
		renderQuotes();
	});

	// rate a quote
	$(document).on('click', '.quote-rating .btn', function() {
		var index = $(this).parents('.quote:first').data('index');
		quotes[index].rating = +$(this).text();
		quotes.sort(compareByReverseRating);
		saveQuoteData();
		renderQuotes();
	});

	// filter by author
	$(document).on('click', '.quote-author-link', function() {
		var author = $(this).text().substring(1);
		filteredAuthor = author;
		showByAuthor(author);
		$('#random-quote-modal').modal('hide');
		clearValidation();
		renderQuotes();
		// $('.quote-author-link').remove();
	});

	// remove filter by author
	$('#author-shown-close').on('click', function() {
		hideByAuthor();
		filteredAuthor = ''
		renderQuotes();
	});

	// show a random quote in a modal
	$('#random-quote-button').on('click', function() {
		var index = Math.floor(Math.random() * quotes.length);
		var quote = createQuote(quotes[index], index);
		$('#random-quote-modal .modal-body').empty().append(quote);
		$('#random-quote-modal').modal('show');
	});


	// MAIN
	var quotes = getQuoteData();
	var filteredAuthor = '';
	quotes.sort(compareByReverseRating);
	renderQuotes();
	$('#inputAuthor').focus();

});
