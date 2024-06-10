 document.addEventListener('DOMContentLoaded', function () {
const lis1 = document.getElementById('list')
const lis2= document.getElementById('list2')
if (lis1) {
lis1.addEventListener('click', function (e) {

	const nav =document.getElementById('nav')
	const main_menu = document.querySelector('.main_menu')
	if (main_menu) {
		main_menu.remove()
	}else{
		const div = document.createElement("div")
	 div.className='main_menu'
	 div.innerHTML=`
			<div class="main_ul">
			 <ul class=" ">           
              
            <li class="it lg"><a href="/user/signUp">Register </a>  </li>
            <li class="it lgo"><a href="/user/login">Login </a>  </li>
 
 
        </ul>
			 			</div>
		`;
	 nav.appendChild(div)
	}
	  
})

}
  if (lis2) {
  	 lis2.addEventListener('click', function (e) {
	const nav =document.getElementById('nav')
	const main_menu2 = document.querySelector('.main_menu2')
	 if (main_menu2) {
	 	main_menu2.remove()
	 }else{
	 	const div2 = document.createElement("div")
	 div2.className='main_menu2'
	 div2.innerHTML=`
			<div >
			 <ul class=" ">           
             <li class="it lgo"><a href="">Generos</a>  </li>
            <li class="it lg"><a href="">Home</a>  </li>
            <li class="it lgo"><a href="">Donar</a>  </li>
 
 
        </ul>
			 			</div>
		`;
		nav.appendChild(div2)
	 }
	  

})
  }
 
 

});



