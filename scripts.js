/* --- FUNCTION FOR THE CLOCK --- */

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =  h + ":" + m + ":" + s;
    
    // Update date
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    document.getElementById('date').innerHTML = today.toLocaleDateString('en-US', options);
    
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

/* --- NOTES FUNCTIONALITY --- */

function saveNote() {
    const noteText = document.getElementById('note-area').value;
    localStorage.setItem('desktopNote', noteText);
    alert('Note saved!');
}

function clearNote() {
    document.getElementById('note-area').value = '';
    localStorage.removeItem('desktopNote');
}

function loadNote() {
    const savedNote = localStorage.getItem('desktopNote');
    if (savedNote) {
        document.getElementById('note-area').value = savedNote;
    }
}

/* --- QUICK LINKS --- */

function openLink(url) {
    window.open(url, '_blank');
}

/* --- SYSTEM INFO --- */

function updateSystemInfo() {
    document.getElementById('browser-info').textContent = navigator.userAgent.split(' ')[0];
    document.getElementById('screen-info').textContent = screen.width + 'x' + screen.height;
    document.getElementById('local-time').textContent = new Date().toLocaleString();
    document.getElementById('online-status').textContent = navigator.onLine ? 'Online' : 'Offline';
}

function refreshSystemInfo() {
    updateSystemInfo();
}

/* --- NASA APOD FUNCTIONALITY --- */

const NASA_API_KEY = 'j0ttli1tS7nNxTJmYRGMn9KBlHm4vTwIF9EywdoN';

function loadNASAPhoto() {
    const loadingDiv = document.getElementById('apod-loading');
    const imageDiv = document.getElementById('apod-image');
    const titleDiv = document.getElementById('apod-title');
    const explanationDiv = document.getElementById('apod-explanation');
    
    loadingDiv.style.display = 'block';
    imageDiv.style.display = 'none';
    titleDiv.textContent = '';
    explanationDiv.textContent = '';
    
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            loadingDiv.style.display = 'none';
            
            if (data.media_type === 'image') {
                imageDiv.src = data.url;
                imageDiv.style.display = 'block';
            }
            
            titleDiv.textContent = data.title;
            explanationDiv.textContent = data.explanation;
        })
        .catch(error => {
            loadingDiv.textContent = 'Error loading NASA photo';
            console.error('NASA APOD Error:', error);
        });
}

/* --- CURIOSITY ROVER FUNCTIONALITY --- */

function loadCuriosityPhoto() {
    const loadingDiv = document.getElementById('rover-loading');
    const imageDiv = document.getElementById('rover-image');
    const infoDiv = document.getElementById('rover-info');
    
    loadingDiv.style.display = 'block';
    imageDiv.style.display = 'none';
    infoDiv.textContent = '';
    
    // Get random sol (Mars day) between 1 and 3000
    const randomSol = Math.floor(Math.random() * 3000) + 1;
    
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${randomSol}&api_key=${NASA_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            loadingDiv.style.display = 'none';
            
            if (data.photos && data.photos.length > 0) {
                const randomPhoto = data.photos[Math.floor(Math.random() * data.photos.length)];
                
                imageDiv.src = randomPhoto.img_src;
                imageDiv.style.display = 'block';
                
                infoDiv.innerHTML = `
                    <strong>Sol:</strong> ${randomPhoto.sol}<br>
                    <strong>Camera:</strong> ${randomPhoto.camera.full_name}<br>
                    <strong>Date:</strong> ${randomPhoto.earth_date}
                `;
            } else {
                loadingDiv.textContent = 'No photos available for this sol';
                setTimeout(loadCuriosityPhoto, 1000);
            }
        })
        .catch(error => {
            loadingDiv.textContent = 'Error loading rover photo';
            console.error('Curiosity Rover Error:', error);
        });
}

/* --- INITIALIZE ON LOAD --- */

window.addEventListener('load', function() {
    loadNote();
    updateSystemInfo();
    loadNASAPhoto();
    loadCuriosityPhoto();
});