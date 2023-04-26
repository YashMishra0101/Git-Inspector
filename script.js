const moonsun_image=document.querySelector('[data-moon-sun-image]');
const main_container =document.querySelector('[data-main-container]');
const search_button=document.querySelector('[data-searchButton]')
const input_field=document.querySelector('[data-input-field]')
const user_info =document.querySelector('[data-user-info-container]');
const user_image =document.querySelector('[data-userImage]');
const user_Name =document.querySelector('[data-userName]');
const user_Id =document.querySelector('[data-userId]');
const user_desc =document.querySelector('[data-userDesc]');
const user_joining_date =document.querySelector('[data-userJoiningDate]');
const use_repos =document.querySelector('[data-useRepos]');
const user_followers =document.querySelector('[data-userFollowers]');
const user_following =document.querySelector('[data-userFollowing]');
const user_loc =document.querySelector('[data-userLoc]');
const user_bioLink =document.querySelector('[data-userBioLink]');
const user_twitter =document.querySelector('[data-userTwitter]');
const user_Work =document.querySelector('[data-userWork]');
const dark_light =document.querySelector('[dark-light]');
const error_page =document.querySelector('[data-error-page]');
const error_page_two =document.querySelector('[data-error-page-two]');
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const root=document.documentElement.style;

root.setProperty('--bg-color', 'white')

const darkMode=()=>{
  root.setProperty('--bg-color','#2b3442');
  moonsun_image.src="./assets/images/sun-icon.svg"
}

const lightMode=()=>{
  root.setProperty('--bg-color', 'white')
  moonsun_image.src="./assets/images/moon-icon.svg"
}

moonsun_image.addEventListener('click',()=>{
  if(root.getPropertyValue('--bg-color')!=='white'){
    lightMode();
  }
  else{
    darkMode();
  }
})

async function fetchData(user) {
  try {
    user_info.style.display='block'
    error_page.classList.remove('active')
    error_page_two.classList.remove('active')
    const response = await fetch(`https://api.github.com/users/${user}`);
    const data = await response.json();
    console.log(data)
    if(data.message==="Not Found"){
    input_field.value="Enter a valid name 😕";
    user_info.style.display='none'
    error_page_two.classList.add('active')

    }
    user_Name.innerHTML=`${data.name}`;
    user_Id.innerHTML=`@${data.login}`; 
    user_Id.href=`https://github.com/${data.login}`;
    user_desc.innerHTML=data.bio===null ? 'This profile has no bio' : `${data.bio}`;
    user_image.src=`${data.avatar_url}`;
    user_joining_date.innerHTML = `${data.created_at}`;
    const createdAt = new Date(data.created_at);
    const year = createdAt.getFullYear();
    const month = months[createdAt.getMonth()];
    const date = String(createdAt.getDate()).padStart(2, '0');
    user_joining_date.innerHTML = `${year}-${month}-${date}`;
    use_repos.innerHTML=`${data.public_repos}`;
    user_followers.innerHTML=`${data.followers}`;
    user_following.innerHTML=`${data.following}`;
    user_loc.innerHTML= data.location === null ? 'Not available' :`${data.location}`;
    user_bioLink.href=data.html_url === null ? 'Not available' : `${data.html_url}`;
    user_bioLink.innerText=data.html_url === null ? 'Not available' : `${data.html_url}`;
    user_twitter.innerHTML=data.twitter_username=== null ? 'Not available' :`${data.twitter_username}`;
    user_Work.innerHTML=data.company === null ? 'Not available' :`${data.company}`;
  } 
  catch {
    input_field.value="Api is not working 😵‍💫🚑🥴";
    user_info.style.display='none'
    error_page.classList.add('active')
    error_page_two.classList.remove('active')
  }
}

const hkirat = "yashmishra0101";
if(input_field.value===""){
  fetchData(hkirat);
}
 
search_button.addEventListener('click', () =>{
  if(input_field.value ===''){
    input_field.value="Enter a valid name"
    user_info.style.display='none';
    error_page.classList.add('active')
  }
  else{
  const searchValue =input_field.value;
  fetchData(searchValue);  
  search_button.style.pointerEvents ='auto';
  }
});






