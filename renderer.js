
$(document).ready(() => {

  const successful = document.getElementById("successful");
  const failure = document.getElementById("failure");
  $(successful).hide();
  $(failure).hide()
  const button = document.getElementById("SUBMIT");
  const BUCKET_NAME = document.getElementById("BUCKET_NAME");
  const IAM_USER_KEY = document.getElementById("IAM_USER_KEY");
  const IAM_USER_SECRET = document.getElementById("IAM_USER_SECRET");
  const FOLDER = document.getElementById("FOLDER");

  $("#SUBMIT").click(() => {
        $.ajax({
          type:'GET',
          url: "http://localhost:4000/aws",
          headers:{
            "FOLDER_LOCATION":FOLDER.value,
            "BUCKET_NAME":BUCKET_NAME.value,
            "IAM_USER_KEY":IAM_USER_KEY.value,
            "IAM_USER_SECRET":IAM_USER_SECRET.value
          },
          cache:true,
          success: msg => {
            $(successful).show();
          },
          error: msg => {
            $(failure).show();
          }
        })
    });
})
