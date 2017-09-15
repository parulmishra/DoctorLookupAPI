export class Doctor
{
  issuePromise(issue)
  {
    let promiseIssue = new Promise(function(resolve,reject)
    {
      let xhr = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${issue}&location=47.6062095,-122.3320708,100&user_key=e336826f32ff2e21d2060411ed4a6ab1`;
      xhr.onload = function()
      {
        if(xhr.status === 200)
        {
          resolve(xhr.response);
        }
        else
        {
          reject(Error(xhr.statusText));
        }
      };
      xhr.open("GET", url,true);
      xhr.send();
    });
    promiseIssue.then(function(response){
      let body = JSON.parse(response);
      console.log(body.data.length);
      if(body.data.length != 0)
      {
        $("#results").append("Your Search Result: Found Doctors: " + body.data.length );

        for(var i=0; i<body.data.length; i++)
        {
          console.log("hi");
          $("#doctors table").append('<tr>');
          $("#doctors table").append('<td>');
          $("#doctors table").append("Title: " + body.data[i].profile.title+ "<br>");
          $("#doctors table").append("First Name: " + body.data[i].profile.first_name+ "<br>");
          $("#doctors table").append("Last Name: " + body.data[i].profile.last_name+ "<br>");
          $("#doctors table").append("Specialist: " + body.data[i].specialties[0].actor+ "<br>");
          $("#doctors table").append("Description: " + body.data[i].specialties[0].description+ "<br>");
          $("#doctors table").append("Accepts New Patients: " + body.data[i].practices[0].accepts_new_patients+ "<br>");
          $("#doctors table").append('</td>');
          $("#doctors table").append('<td>');
          $("#doctors table").append('<img src="'+body.data[i].profile.image_url+'"/>');
          $("#doctors table").append('</td>');
          $("#doctors table").append('</tr>');
        }
      }
      else
      {
        $("#results").append("Your Search Result: Found Doctors: " + body.data.length);
      }
    },
    function(error)
    {
      $("#errorDoctors").append(`Your doctor lookup code has some error : ${error.message}`);
    });
  }

  namePromise(firstName,lastName)
  {
    let promiseName = new Promise(function(resolve,reject)
    {
      let xhr = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?first_name=${firstName}&last_name=${lastName}&location=47.6062095%2C-122.3320708%2C10&user_location=47.6062095%2C-122.3320708&skip=0&user_key=e336826f32ff2e21d2060411ed4a6ab1`;
      xhr.onload = function()
      {
        if(xhr.status === 200)
        {
          resolve(xhr.response);
        }
        else
        {
          reject(Error(xhr.statusText));
        }
      };
      xhr.open("GET", url,true);
      xhr.send();
    });
    promiseName.then(function(response){
      let body = JSON.parse(response);
      console.log(body.data.length);
      if(body.data.length != 0)
      {
          $("#results").val("");
          $("#results").append("Your Search Result: Found Doctors: " + body.data.length);

          for(var i=0; i<body.data.length; i++)
          {
            $("#doctors table").append('<tr>');
            $("#doctors table").append('<td>');
            $("#doctors table").append("Name: " + body.data[i].practices[0].name+ "<br>");
            $("#doctors table").append("Location: " + body.data[i].practices[0].location_slug+ "<br>");
            $("#doctors table").append("Accepts New Patients: " + body.data[i].practices[0].accepts_new_patients+ "<br>");
            $("#doctors table").append("Specialist: " + body.data[i].specialties[0].name+ "<br>");
            $("#doctors table").append("Description: " + body.data[i].specialties[0].description+ "<br>");
            $("#doctors table").append('</td>');
            $("#doctors table").append('<td>');
            $("#doctors table").append('<img src="'+body.data[i].profile.image_url+'"/>');
            $("#doctors table").append('</td>');
            $("#doctors table").append('</tr>');
          }
        }
        else
        {
          $("#results").append("Your Search Result: Found Doctors: " + body.data.length );
        }
      },
      function(error)
      {
        $("#errorDoctors").append(`Your doctor lookup code by name has some error : ${error.message}`);
      });
    }
}
