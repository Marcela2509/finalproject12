class Car {
  constructor(tempX, tempY, baseW, baseH, noiseOffset) {
    this.x = tempX;    // X position of the car
    this.y = tempY;    // Y position of the car
    this.noiseOffset = noiseOffset;
    this.w = baseW * (0.8 + noise(this.noiseOffset) * 0.4); // Width varies by noise
    this.h = baseH * (0.8 + noise(this.noiseOffset + 10) * 0.4); // Height varies by noise
    this.speed = noise(this.noiseOffset + 20) * 3 + 1; // Speed varies by noise
    this.bodyColor = color(noise(this.noiseOffset + 30) * 255, noise(this.noiseOffset + 40) * 255, noise(this.noiseOffset + 50) * 255); // Noise-based color for the body
    this.wheelColor = color(noise(this.noiseOffset + 60) * 255, noise(this.noiseOffset + 70) * 255, noise(this.noiseOffset + 80) * 255); // Noise-based color for the wheels
  }

  // Display the car
  display() {
    noStroke();
    // Car body
    fill(this.bodyColor);
    rect(this.x, this.y, this.w, this.h);

    // Car roof
    rect(this.x + this.w * 0.3, this.y - this.h * 0.75, this.w * 0.45, this.h * 0.8);

    // Car window (flipped triangle on the right side)
    stroke(50);
    fill(0, 0, 100);
    triangle(this.x + this.w * 0.75, this.y - this.h * 0.75, this.x + this.w * 0.75, this.y, this.x + this.w * 0.95, this.y);

    // Wheels
    fill(55);
    ellipse(this.x + this.w * 0.2, this.y + this.h, this.h * 0.9, this.h * 0.9); // Left wheel
    ellipse(this.x + this.w * 0.8, this.y + this.h, this.h * 0.9, this.h * 0.9); // Right wheel
  }

  // Move the car
  move() {
    this.x += this.speed;
    if (this.x > width) {
      this.x = -this.w; // Reset position to the left side of the screen
    }
  }
}

let cars = [];

function setup() {
  createCanvas(800, 600);
  noiseSeed(random(1000)); // Seed the noise function
  for (let i = 0; i < 9; i++) {
    let noiseOffset = random(1500); // Different noise offset for each car
    cars[i] = new Car(-200 + i * 150, 300, 200, 50, noiseOffset); // Create multiple car objects with noise-based sizes and colors
  }
}

function draw() {
  background(200); // Road
  fill(40, 80, 150); // Sky
  rect(0, 0, 800, 310);
  fill(50);
  rect(0, 380, 800, 220); // Adjusted to fill the bottom part of the canvas
  for (let car of cars) {
    car.move(); // Move the car
    car.display(); // Display the car
  }
}
