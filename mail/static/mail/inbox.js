document.addEventListener('DOMContentLoaded', function() {

  //will this show? It does but only in incognito mode
  console.log("Hello world!");

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
  
});

function compose_email() {
//Will this appear, it does! 
  console.log("Compose Email Loaded!");

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  //event listiner to send mail
  document.getElementById("send-email").addEventListener('click',sendmail);
 
}

  function sendmail(){
    console.log("running the send email function");
    //debugger;
    //code is breaking here
            fetch('/emails', {
              method: 'POST',
              body: JSON.stringify({
                  recipients: querySelector('#compose-recipients').value,
                  subject: querySelector('#compose-subject').value,
                  body: querySelector('#compose-body').value
              })
            }) 
            .then(response => response.json())
            .then(result => {
                // Print result
                console.log(result);
                debugger;
            })
  }
 

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}