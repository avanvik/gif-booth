const takePhotoButton = document.querySelector('#btn-take-photo');
const makeGIFButton = document.querySelector('#btn-make-gif')
const discardButton = document.querySelector('#btn-discard-gif')
const canvas = document.querySelector('canvas');
const imageBuffer = document.querySelector('#image-buffer')
const imageRoll = document.querySelector('#image-roll')
const imgGIF = document.querySelector('#image-gif')
const cameraCapture = document.querySelector('#camera-capture')
const resultOverlay = document.querySelector('#result-overlay')
let imageCapture

// Check if image capture is allowed on this device
navigator.mediaDevices.getUserMedia({video: true})
  .then(mediaStream => {
		cameraCapture.srcObject = mediaStream;
		
    const track = mediaStream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);
  })
	
function takePhoto() {
	const flash = document.createElement('div')
	document.querySelector('.app-frame').append(flash)
	flash.classList.add('flash')

	const image = document.createElement('img')
	const thumbnail = document.createElement('img')

	imageCapture.takePhoto()
	.then(function(blob) {
		image.src = URL.createObjectURL(blob);
		thumbnail.src = URL.createObjectURL(blob);

		imageBuffer.append(image)
		imageRoll.prepend(thumbnail)
		imageRoll.classList.remove('hidden')
	})
}
	
takePhotoButton.onclick = takePhoto

function makeGif() {
	var gif = new GIF({
		workers: 2,
		quality: 10
	});

	for (var i=0; i<imageBuffer.childElementCount; i++) {
		gif.addFrame(imageBuffer.childNodes[i])
		console.log(gif)
	}

	gif.on('finished', function(blob) {
		imgGIF.src = URL.createObjectURL(blob)
		resultOverlay.classList.remove('hidden')
	});

	gif.render()
}

makeGIFButton.onclick = makeGif

discardButton.onclick = ()=>{ location.reload() }