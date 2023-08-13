
document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('mousemove', (e) => {
  const canvas = document.querySelector('#canvas');
  const context = canvas.getContext('2d');
  canvas.width = window.innerWidth / 2
  canvas.height = window.innerHeight / 2

    // to increase performance createImageData method 
    // should be executed once e.g. during initialization
  const image = context.createImageData(canvas.width, canvas.height);
	const data = image.data;

    function drawPixel(x, y, color) {
      	let roundedX = Math.round(x);
      	let roundedY = Math.round(y);
      	let index = 4 * (canvas.width * roundedY + roundedX);
      	data[index + 0] = color.r;
        data[index + 1] = color.g;
        data[index + 2] = color.b;
        data[index + 3] = color.a;
    }

    function swapBuffer() {
    	context.putImageData(image, 0, 0);
    }

    const colors = [
      	{r: 255, g:   0, b:   0, a: 255}, // red
      	{r:   0, g: 255, b:   0, a: 255}, // green
      	{r:   0, g:   0, b: 255, a: 255}, // blue
    ];

    const center = [
      window.innerWidth / 2,
      window.innerHeight / 2
    ]
    
    const screenResCoeff = 16 / window.innerWidth

      let point = new Complex(
        (e.clientX - center[0]) * screenResCoeff,
        (e.clientY - center[1]) * screenResCoeff
      )
      for(let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          let suspect = new Complex(
            (x - center[0] / 2) * screenResCoeff, 
            (y - center[1] / 2) * screenResCoeff
          )
          let suspect2 = complexMultiplication(suspect, suspect)
          let formula = complexSum(suspect2, point)
          
          drawPixel(x, y, {
            r: 255 / 4 * formula.modulo2,
            g: 255 / 4 * formula.modulo2,
            b: 255 / 4 * formula.modulo2,
            a: 255 / 4 * formula.modulo2
          })
        }
      }
    

    swapBuffer();
  })
})

class Complex {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.modulo2 = this.x * this.x + this.y * this.y
  }
}

function complexSum(a, b) {
  return new Complex(a.x + b.x, a.y + b.y)
}

function complexMultiplication(a, b) {
  return new Complex(a.x * b.y + a.y * b.x, a.y * b.y - a.x * b.x)
}