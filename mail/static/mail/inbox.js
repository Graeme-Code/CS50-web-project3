
//document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  //document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  //document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  //document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  //document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  //console.log("load inbox");
  //load_mailbox('inbox');
  
//});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  //event listner to send mail
  document.getElementById("send-email").addEventListener('click', sendmail);
  }

  function sendmail(){

            fetch('/emails', {
              method: 'POST',
              body: JSON.stringify({
                  recipients: document.querySelector('#compose-recipients').value,
                  subject: document.querySelector('#compose-subject').value,
                  body: document.querySelector('#compose-body').value
              }) 
            }) 
            .then(response => response.json())
            .then(result => {
                console.log(result);
            })
            .then(() => 
             load_mailbox('sent')
            )
            .catch((error) => {
              console.error('Error:', error);
         }); 
  }
 

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  document.getElementById("emails").setAttribute('name', mailbox);
  
  //console.log(document.getElementById("emails"));
  //element.setAttribute("id", mailboxname);
  //console.log(element);
}


  //function for getting mailbox mails
  function getmail(mailbox) {

    fetch('/emails/inbox')
      .then(response => response.json())
      .then(emails => {
          // Print emails
          console.log(emails);

          // ... do something else with emails ...
          //grab data needed for loop 
          //var mailbox_length = emails.length;
          //var email;
          //get user name 
          var user = document.getElementById("logged_in_user").innerHTML;
          console.log(user);
          //console.log(mailbox_length);
          var sentmails = [];
          var inboxmails = [];
          var archive = [];
          // need to sort data based on mail box. Inbox is emails recieved, sent is emails sent. trying an if statment
          if (mailbox === 'inbox') {
            console.log(mailbox);
            //loop through array of emails and save to a new array emails where 
            //first loop through mails and just display the sender
            for (email in emails) {
              if (emails[email].sender != user) {
                 //append to an array
                 inboxmails.push(emails[email]);
              }
            }
          } else if ( mailbox === 'sent') {
            console.log(mailbox);
            //show only emails where sender is logged in user
            for (email in emails) {
                if (emails[email].sender == user) {
                  //append object to an array
                  sentmails.push(emails[email]);
                  //emaildivs(emails[email]);
                }

             } 
          } else if ( mailbox === 'archive' ) {
            console.log(mailbox);
            //check archive value in emails
            for (email in emails) {
                 if (emails[email].archived == true) {
            //append object to an array
            archive.push(emails[email]);
            }
           } 
          }
    });
  }

  //build and populate email div
  function emaildivs(email){
    const element = document.createElement('div');
    //add an CSS class for styling and formatting. 
    element.id = "emailpreview";
    //element.style.emailpreview;
    element.className += "emailPreview";
    //add a nested div
    const subject = document.createElement('p')
    const timestamp = document.createElement('p')
    const sender = document.createElement('p')
    
    sender.innerHTML = email.sender;
    subject.innerHTML = email.subject;
    timestamp.innerHTML = email.timestamp;
    //element.innerHTML = email.timestamp;
    element.addEventListener('click', function() {
        console.log('This element has been clicked!')
    });
    document.getElementById('emails-view').append(element);
    document.getElementById('emailpreview').appendChild(sender)
    document.getElementById('emailpreview').appendChild(subject)
    document.getElementById('emailpreview').appendChild(timestamp)
  }


  //Can I import a react class from here? No for that I need a prod enviroment, lets leave this for next class. 




