const showAllButton = document.getElementById('show-all');
const loadData = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    showAllButton.classList.remove('d-none');
     //start spinner or loader
     toggleSpinner(true);
    displayData(data.data.tools.slice(0, 6));
    
   
}


const displayData = data =>{
   //console.log(data);
   //const keys = Object.keys(data[5]);
   //data = data.slice(0,6);
   const containerInfo = document.getElementById('app-info');
   containerInfo.innerHTML = "";
   data.forEach(singleData => {
    
    const appDiv = document.createElement('div');
    appDiv.classList.add('col');
    appDiv.innerHTML = `
    <div class="card p-2">
        <img src="${singleData.image}" class="card-img-top mx-auto h-50" alt="...">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            

            <div id = "feature-info"> ${singleData.features ? displayFeature(singleData.features) : ''}</div>
            <hr>
                  <div class="mb-4">
                    <h5 class="card-title">${singleData.name}</h5>
                    <span id="date-sort"><i class="fa-solid fa-calendar-days"></i>  ${singleData.published_in}</span>
                    <div class="d-flex justify-content-end" style="margin-top: -50px;">
                        <button type="button" onclick="loadAppDetails('${singleData.id}')" class="btn bg-danger-subtle rounded-pill" data-bs-toggle="modal" data-bs-target="#appDetailModal"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                    
                  </div>
        </div>
    </div>
    `;
    containerInfo.appendChild(appDiv);
   });
   //stop spinner or loader
   toggleSpinner(false);
}


const displayFeature = features =>{
    let count = 1;
    //const featureInfo = document.getElementById('feature-info');
    const feature = features;
    //console.log(feature);
    const featureLength = feature.length;
    for(let i = 0; i < featureLength; i++){
        return `<ul class="card-text" style="margin-left: -25px;">
        ${features.map(feature => `<span>${count++}.</span><li style="list-style: none; margin-left: 20px; margin-top: -25px;">${feature}</li>`).join("")}
        </ul>
        `;
    }
}

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


const showAllDataTogether = () => {
    //const showAllButton = document.getElementById('show-all');
    fetch("https://openapi.programming-hero.com/api/ai/tools")
      .then((res) => res.json())
      .then((data) => {
        showAllButton.classList.add('d-none');
        toggleSpinner(true);
        displayData(data.data.tools);
      });
      
  };

const loadAppDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAppDetail(data.data);
}

const displayAppDetail = data =>{
    const appDetail = document.getElementById('app-detail');
    appDetail.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-5 mb-3 p-3">
        <div class="col">
          <div class="card h-100 bg-danger-subtle bg-gradient border-danger">
            <div class="card-body">
              <h5 class="card-title">${data.description}</h5>
              <div class ="d-flex justify-content-center gap-2">
                <div class="bg-light-subtle w-30 border p-2 rounded-2 text-success fw-semibold">
                  <span>${data.pricing ? data.pricing[0].price : 'Free of Cost/'}</span>
                  <span>${data.pricing ? data.pricing[0].plan : 'Basic'}</span>
                </div>
                <div class="bg-light-subtle w-30 border p-2 rounded-2 text-warning fw-semibold">
                  <span>${data.pricing ? data.pricing[1].price : 'Free of Cost/'}</span>
                  <span>${data.pricing ? data.pricing[1].plan : 'Pro'}</span>
                </div>
                <div class="bg-light-subtle w-30 border p-2 rounded-2 text-danger fw-semibold">
                  <span>${data.pricing ? data.pricing[2].price : 'Free of Cost/'}</span>
                  <span>${data.pricing ? data.pricing[2].plan : 'Enterprise'}</span>
                </div>
              </div>
                <div class="d-flex justify-content-center mt-2">
                    <div>
                        <h4>Feature</h4>
                        <ul style="margin-left: -15px;">
                           <li> ${data.features['1'] ? data.features['1'].feature_name : 'No Data Found'}</li>
                           <li> ${data.features['2'] ? data.features['2'].feature_name : 'No Data Found'}</li>
                           <li> ${data.features['3'] ? data.features['3'].feature_name : 'No Data Found'}</li>
                           <li> ${data.features['4'] ? data.features['4'].feature_name : 'No Data Found'}</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Integrations</h4>
                        <div style="margin-left: 15px;"> ${data.integrations ? displayIntegrationDetails(data.integrations) : 'No Data Found'}</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <div class="position-relative">
                <div class="position-absolute mt-1" style="margin-left: 220px;">
                    <button class ="btn btn-danger rounded-2 p-2 mx-auto">${data.accuracy.score ? (data.accuracy.score * 100) : '0'}% accuracy</button>
                </div>
                <img src="${data.image_link[0]}" class="card-img-top mb-5 mx-auto p-2 rounded-2" alt="...">
            </div>
            <div class="card-body">
              <h5 class="card-title">${data.input_output_examples['0'] ? data.input_output_examples['0'].input : 'Can you give any example?' }</h5>
              <p class="card-text">${data.input_output_examples['0'] ? data.input_output_examples['0'].output : 'No! Not Yet! Take a break!!!'}</p>
            </div>
        </div>
    </div>
    `;
}

const displayIntegrationDetails = features =>{
    const feature = features;
    const featureLength = feature.length;
    for(let i = 0; i < featureLength; i++){
        return `<ul class="card-text" style="margin-left: -25px;">
        ${features.map(feature => `<li>${feature}</li>`).join("")}
        </ul>
        `;
    }
}

        



const sortByDate = () =>{
    fetch("https://openapi.programming-hero.com/api/ai/tools")
      .then((res) => res.json())
      .then((data) => {
        
        //start spinner or loader
        toggleSpinner(true);
        data1 = data.data.tools;
        const sorted = data1.sort(function(a, b){return new Date(b.published_in) - new Date(a.published_in)});
        displayData(sorted);
        showAllButton.classList.add('d-none');
      });
  };

loadData();