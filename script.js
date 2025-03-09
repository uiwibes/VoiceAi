document.addEventListener('DOMContentLoaded', function() {
    // Create audio visualization effect
    createAudioVisualization();
    
    // Create background sound icons
    createBackgroundIcons();
    
    // Add scroll animation for the scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator.addEventListener('click', function() {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect to the demo button
    const demoBtn = document.querySelector('.demo-btn');
    demoBtn.addEventListener('click', function() {
        alert('این ویژگی به زودی پیاده‌سازی خواهد شد!');
    });

    // Add pulsing effect to the audio wave
    animateAudioWave();
    
    // Create multiple sine waves with different speeds
    createMultipleSineWaves();
});

function createMultipleSineWaves() {
    const sineWaveContainer = document.querySelector('.sine-wave');
    sineWaveContainer.innerHTML = ''; // Clear any existing waves
    
    // Create 24 sine waves with different speeds and opacities (even more)
    for (let i = 0; i < 24; i++) {
        const sineWave = document.createElement('div');
        sineWave.className = 'sine-wave-item';
        
        // Style the sine wave
        sineWave.style.position = 'absolute';
        sineWave.style.top = `${i * 2}px`; // Add small vertical spacing between waves
        sineWave.style.left = '0';
        sineWave.style.width = '1200px'; // Long waves
        sineWave.style.height = '1.5px'; // Even thinner lines with spacing
        sineWave.style.background = `linear-gradient(90deg, transparent, ${getGradientColor(i * 8)}, ${getGradientColor(i * 8 + 4)}, ${getGradientColor(i * 8 + 8)}, transparent)`;
        sineWave.style.opacity = 0.8 - (i * 0.02); // Subtle opacity difference
        
        // Add mask for sine wave shape - more complex path with more waves
        const amplitude = 6 + (i % 6) * 1.5; // Different but smaller amplitudes
        const frequency = 2 + (i % 4) * 0.5; // Different frequencies
        const phaseShift = i * (Math.PI / 12); // Phase shift for each wave
        
        // Create a more complex path with more waves and phase shifts
        let path = `M0,30 `;
        for (let j = 0; j < 30; j++) { // Even more waves
            const x1 = j * 40; // Smaller segments for more waves
            const x2 = j * 40 + 20;
            const x3 = j * 40 + 40;
            
            // Use sine function with phase shift for more natural waves
            const y1 = 30 - amplitude * Math.sin((j/frequency) + phaseShift);
            const y2 = 30 + amplitude * Math.sin((j/frequency) + phaseShift + Math.PI/2);
            const y3 = 30;
            
            path += `C${x1},${y1} ${x2},${y2} ${x3},${y3} `;
        }
        
        const maskUrl = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 60'%3E%3Cpath d='${path}' stroke='white' fill='none' stroke-width='1.2'/%3E%3C/svg%3E")`;
        
        sineWave.style.maskImage = maskUrl;
        sineWave.style.maskSize = '1200px 100%';
        sineWave.style.maskRepeat = 'repeat-x';
        sineWave.style.webkitMaskImage = maskUrl;
        sineWave.style.webkitMaskSize = '1200px 100%';
        sineWave.style.webkitMaskRepeat = 'repeat-x';
        
        // Add animation with different speeds and directions
        const speed = 8 + (i % 8) * 1.5; // More varied speeds
        sineWave.style.animation = `sineWaveAnimation ${speed}s linear infinite`;
        sineWave.style.animationDirection = i % 2 === 0 ? 'normal' : 'reverse';
        
        sineWaveContainer.appendChild(sineWave);
    }
}

function createBackgroundIcons() {
    const bgIcons = document.querySelector('.bg-icons');
    const soundIcons = [
        'fa-solid fa-music',
        'fa-solid fa-microphone',
        'fa-solid fa-headphones',
        'fa-solid fa-volume-high',
        'fa-solid fa-waveform',
        'fa-solid fa-sliders',
        'fa-solid fa-radio',
        'fa-solid fa-podcast',
        'fa-solid fa-record-vinyl',
        'fa-solid fa-compact-disc',
        'fa-solid fa-file-audio',
        'fa-solid fa-circle-play',
        'fa-solid fa-music-note',
        'fa-solid fa-microphone-lines',
        'fa-solid fa-soundwave'
    ];
    
    // Create 20 random icons
    for (let i = 0; i < 20; i++) {
        const icon = document.createElement('i');
        // Select a random icon from the array (handle potential missing icons gracefully)
        const randomIcon = soundIcons[Math.floor(Math.random() * soundIcons.length)] || 'fa-solid fa-music';
        icon.className = `sound-icon ${randomIcon}`;
        
        // Random position
        const x = Math.random() * 100; // % of viewport width
        const y = Math.random() * 100; // % of viewport height
        
        // Random size
        const size = 20 + Math.random() * 40; // px
        
        // Random opacity
        const opacity = 0.05 + Math.random() * 0.15;
        
        // Random animation duration and delay
        const duration = 15 + Math.random() * 20; // seconds
        const delay = Math.random() * 10; // seconds
        
        // Apply styles
        icon.style.left = `${x}%`;
        icon.style.top = `${y}%`;
        icon.style.fontSize = `${size}px`;
        icon.style.opacity = opacity;
        icon.style.color = getGradientColor(Math.random() * 120);
        icon.style.animationDuration = `${duration}s`;
        icon.style.animationDelay = `-${delay}s`; // Negative delay for immediate start at different positions
        
        bgIcons.appendChild(icon);
    }
}

function createAudioVisualization() {
    const audioWave = document.querySelector('.audio-wave');
    audioWave.innerHTML = ''; // Clear any existing elements
    
    // Add back the central wave and sine wave containers
    const centralWave = document.createElement('div');
    centralWave.className = 'central-wave';
    audioWave.appendChild(centralWave);
    
    // Create horizontal wave effect in the center
    createHorizontalWave(centralWave);
    
    const sineWave = document.createElement('div');
    sineWave.className = 'sine-wave';
    audioWave.appendChild(sineWave);
    
    // Create two layers of wave lines for more depth
    createWaveLayer(audioWave, 150, 200, 1); // Outer layer
    createWaveLayer(audioWave, 100, 170, 0.8); // Inner layer
    
    // Add glowing dots
    for (let i = 0; i < 15; i++) {
        const dot = document.createElement('div');
        dot.className = 'wave-dot';
        
        // Random position within the circle
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 160;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        // Style the dot
        dot.style.position = 'absolute';
        dot.style.width = `${3 + Math.random() * 5}px`;
        dot.style.height = dot.style.width;
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = getGradientColor(Math.random() * 120);
        dot.style.boxShadow = `0 0 10px ${getGradientColor(Math.random() * 120)}`;
        dot.style.left = `calc(50% + ${x}px)`;
        dot.style.top = `calc(50% + ${y}px)`;
        dot.style.opacity = 0.7 + Math.random() * 0.3;
        
        // Add floating animation
        dot.style.animation = `floatAnimation ${3 + Math.random() * 5}s infinite alternate`;
        dot.style.animationDelay = `${Math.random() * 3}s`;
        
        audioWave.appendChild(dot);
    }
    
    // Add keyframes for animations
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes waveAnimation {
            0% {
                height: ${10 + Math.random() * 20}px;
                opacity: 0.3;
            }
            50% {
                height: ${20 + Math.random() * 30}px;
                opacity: 0.6;
            }
            100% {
                height: ${30 + Math.random() * 40}px;
                opacity: 0.8;
            }
        }
        
        @keyframes floatAnimation {
            0% {
                transform: translate(0, 0);
                opacity: 0.7;
            }
            50% {
                transform: translate(${-5 + Math.random() * 10}px, ${-5 + Math.random() * 10}px);
                opacity: 1;
            }
            100% {
                transform: translate(${-5 + Math.random() * 10}px, ${-5 + Math.random() * 10}px);
                opacity: 0.7;
            }
        }
        
        @keyframes pulseAnimation {
            0% {
                transform: scale(0.95);
                box-shadow: 0 0 30px rgba(137, 43, 226, 0.4);
            }
            50% {
                transform: scale(1);
                box-shadow: 0 0 50px rgba(137, 43, 226, 0.6);
            }
            100% {
                transform: scale(0.95);
                box-shadow: 0 0 30px rgba(137, 43, 226, 0.4);
            }
        }
        
        @keyframes sineWaveAnimation {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-1200px);
            }
        }
    `;
    document.head.appendChild(style);
}

function createHorizontalWave(container) {
    // Create a sound wave container
    const soundWave = document.createElement('div');
    soundWave.className = 'sound-wave';
    
    // Number of bars to create - increased for wider coverage
    const numBars = 100; // Increased from 40 to 60
    
    // Create bars
    for (let i = 0; i < numBars; i++) {
        const bar = document.createElement('div');
        bar.className = 'bar';
        
        // Random animation duration for more natural look
        const animationDuration = Math.random() * (0.7 - 0.2) + 0.2;
        bar.style.animationDuration = `${animationDuration}s`;
        
        // Add gradient color based on position
        const position = i / numBars;
        let color1, color2;
        
        if (position < 0.33) {
            color1 = interpolateColor('#9C27B0', '#7B1FA2', position / 0.33);
            color2 = interpolateColor('#3F51B5', '#303F9F', position / 0.33);
        } else if (position < 0.66) {
            color1 = interpolateColor('#7B1FA2', '#512DA8', (position - 0.33) / 0.33);
            color2 = interpolateColor('#303F9F', '#1A237E', (position - 0.33) / 0.33);
        } else {
            color1 = interpolateColor('#512DA8', '#9C27B0', (position - 0.66) / 0.34);
            color2 = interpolateColor('#1A237E', '#3F51B5', (position - 0.66) / 0.34);
        }
        
        bar.style.background = `linear-gradient(to bottom, transparent, ${color1}, ${color2}, transparent)`;
        
        soundWave.appendChild(bar);
    }
    
    container.appendChild(soundWave);
}

// Helper function to interpolate between two colors
function interpolateColor(color1, color2, ratio) {
    // Convert hex to RGB
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
    
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
    
    // Interpolate
    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);
    
    // Convert back to hex
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

function createWaveLayer(container, count, radius, opacity) {
    for (let i = 0; i < count; i++) {
        const line = document.createElement('div');
        line.className = 'wave-line';
        
        // Calculate position around the circle
        const angle = (i / count) * Math.PI * 2;
        
        // Style the line
        line.style.position = 'absolute';
        line.style.width = '2px';
        line.style.height = `${15 + Math.random() * 25}px`;
        line.style.background = getGradientColor(i % 120);
        line.style.transformOrigin = 'bottom center';
        line.style.left = '50%';
        line.style.top = '50%';
        line.style.transform = `rotate(${angle}rad) translateY(-${radius}px)`;
        line.style.opacity = opacity;
        
        // Add animation
        line.style.animation = `waveAnimation ${1 + Math.random() * 2}s infinite alternate`;
        line.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(line);
    }
}

function animateAudioWave() {
    const audioWave = document.querySelector('.audio-wave');
    audioWave.style.animation = 'pulseAnimation 4s infinite';
}

function getGradientColor(index) {
    // Create a more vibrant gradient from blue to purple to pink
    const hue = 220 + (index / 120) * 100; // 220 is blue, 320 is pink
    return `hsl(${hue}, 90%, 65%)`;
}

// Add event listener for window load to set random animation durations
window.addEventListener("load", () => {
    setTimeout(() => {
        const bars = document.querySelectorAll(".bar");
        bars.forEach((bar) => {
            // Random animation duration
            const animationDuration = Math.random() * (0.7 - 0.2) + 0.2;
            bar.style.animationDuration = `${animationDuration}s`;
        });
    }, 100);
}); 