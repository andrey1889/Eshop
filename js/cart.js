var cart ={};

function loadCart() {
    //Проверяю есть ли в localStorage запись  cart
    if (localStorage.getItem('cart')) {
       //Если есть расшифровываю и записываю в переменную cart
       cart = JSON.parse(localStorage.getItem('cart')); 
       showCart();
    
   }
    else {
$('.main-cart').html('Корзина пуста!');
    }
   }
function showCart() {
   //вывод корзины
   if (!isEmpty(cart)) {
      $('.main-cart').html('Корзина пуста!');
   }
   else {
 $.getJSON('goods.json',function (data) {
    var goods = data;
    var out = '';
    for (var id in cart) {
          out += `<button data-id="${id}" class="del-goods">x</button>`;
        out += `<img src="images//${goods[id].img}">`;  
        out +=  `${goods[id].name}`;
        out += `  <button data-id="${id}" class="minus-goods">-</button>  `;
        out += `${cart[id]}`;
        out += `  <button data-id="${id}" class="plus-goods">+</button>  `;
        out += `${cart[id]*goods[id].cost }`;
        out += `<br>`;
     
        }
    $('.main-cart').html(out);
$('.del-goods').on('click', delGoods);
$('.plus-goods').on('click', plusGoods);
$('.minus-goods').on('click', minusGoods);
 });   
}
}

function delGoods() {
  // удаляем товар из корзины
   var id = $(this).attr('data-id');
   delete cart[id];
   saveCart();
   showCart();
}

function plusGoods() {
   // Добавляем товар в корзине
    var id = $(this).attr('data-id');
   cart[id]++;
    saveCart();
    showCart();
 }

 function minusGoods() {
   // Уменьшаем товар в корзине
    var id = $(this).attr('data-id');
   if (cart[id]==1) {
      delete cart[id];
   } else {(cart[id]--)
    saveCart();
    showCart();
 }}


//сохраняем корзину в localStorage
function saveCart() {
   localStorage.setItem('cart',JSON.stringify(cart));    //корзину в строку
}

function isEmpty(object) {
   //Проверка корзины на пустоту
 for (var key in object) 
 if (object.hasOwnProperty(key)) 
   return true;
return false;
 } 

function sendEmail() {
   var ename = $('#ename').val();
   var email = $('#email').val();
   var ephone = $('#ephone').val();
   if (ename!='' && email!='' && ephone!='') {
      if (isEmpty(cart)) {
    $.post(
      "core/mail.php",
             {
                "ename": ename,
                "email": email,
                "ephone": ephone,
                "cart": cart
         },
         function(data) {
            if (data==1) {
               alert('Заказ отправлен');
            }
            else{ alert('Повторите заказ');}
         }
    )
      }
     else { alert('Корзина пуста');
   }
}
else
   { alert('Заполните поля');
   }

}

 $(document).ready(function () {
    loadCart();
    $('.send-email').on('click', sendEmail); //Отправить письмо с заказом
 });