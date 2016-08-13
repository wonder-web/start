// Subscribe.js

$( () => {
  let $subscribeForm = $('#subscribe-form'),
      $inputs = $subscribeForm.find('input'),
      $userEmail = null;


  // Paid event
  $(document).on('paid', ()=>{
    let thankyou = $('#thankyou');
    thankyou.removeClass('is-hidden').siblings().addClass('is-hidden');
  })

  //
  // This happens when email subscription form is triggered
  //
  $subscribeForm.submit( function(e){
    e.preventDefault();

    let $form = $(this),
        $action = $form.attr('action'),
        $method = $form.attr('method'),
        valid = $form.checkForm();

    $userEmail = $form.find('input.email').val();

    if(valid){
      let $data = $form.serialize();
      let $position = $form.data('position');

      $form.trigger('clear');

      initiatePayment();

      $.ajax({
        url: $action,
        method: $method,
        data: $data
      })
      .done(function(){
        track('Subscribed');
      })
      .fail(function(r){
        track('Subscribtion Failed');
      });

    }

    return false;
  });

  $('form').on('clear', () => {
    let $this = $(this),
        $err = $this.find('.input-message');

    $this.find('input').removeClass('is-error');
    $err.text('').removeClass('is-show is-error is-success');
  });

  $(document).on('input-error', function(event, obj){
    var $input = obj.input;

    $input.addClass('is-error').focus().select();
  });


  $(document).ready(() => { route(); });
});


// String validation
//

String.prototype.isEmpty = function(){
  var value = this.valueOf(),
      result = (!value || value === '' ? true : false);
  return result;
}

String.prototype.isEmail = function(){
  var value = this.valueOf(),
      re = /[a-z0-9._+\-`']+\@[a-z0-9-_.']+\.[a-z]+/i,
      result = (re.test(value) ? true : false);
  return result;
}

String.prototype.isJSON = function() {
  var a;
  a = true;
  try {
    JSON.parse(this.valueOf());
  } catch (_error) {
    a = false;
  }
  return a;
}

let track = function(event) {
  if (typeof ga !== 'undefined') {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Website',
      eventAction: event,
      eventLabel: 'Index page'
    });
  }
}

let route = function() {
  let hash    = document.location.hash,
      screen  = hash.split('#').pop();

  switch ( screen ) {
    case 'thankyou':
      $(document).trigger('paid');
  }
}

let initiatePayment = function() {
    var handler = StripeCheckout.configure({
      key: 'pk_live_ydPwOceJaiXCoIovGgC6Qv2z',
      image: 'https://s3.amazonaws.com/stripe-uploads/acct_17bLk0JfZxt3W4GQmerchant-icon-1454725510026-129025354.png',
      locale: 'auto',
      token: function(token) {
        $.ajax({
          url: '/charge?token=' + token.id,
          method: 'post'
        }).done(function () {
          $(document).trigger('paid');
          track('Purchase');
        }).fail(function (r) {
          track('Purchase Failed');
        });
      }
    });

    handler.open({
      name: 'Californicate',
      description: 'Как переехать в калифорнию — Survival Guide',
      amount: 5000
    });

    track('Loaded Stripe Widget');
}

// Form validation
//
$.fn.checkForm = function(){
  var $form = this,
      $required = $form.find('.required'),
      $emails = $form.find('[type="email"]'),
      isValid = true;

  $required.each(function(){
    var $input = $(this),
        $val = $input.val();

    if($val.isEmpty()){
      isValid = false;
      $(document).trigger('input-error', {input: $input, text: 'Поле должно быть заполнено'});
    }
  });

  $emails.each(function(){
    var $input = $(this),
        $val = $input.val();

    if(!$val.isEmail()){
      isValid = false;
      $(document).trigger('input-error', {input: $input, text: 'Введите реальный адрес'});
    }
  });

  return isValid;
}
