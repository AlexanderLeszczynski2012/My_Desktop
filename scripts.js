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

/* --- INITIALIZE ON LOAD --- */

window.addEventListener('load', function() {
    loadNote();
    updateSystemInfo();
    loadNASAPhoto();
});