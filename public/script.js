document.addEventListener('DOMContentLoaded', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 300);
    document.getElementById('python-3d-logo').appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xFFD700 });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    camera.position.z = 30;

    function animate() {
        requestAnimationFrame(animate);
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();


    const codeElement = document.getElementById('animated-code');
    const codeText = `
def python_master(student):
    skills = ['Coding', 'Problem Solving']
    knowledge = 'Acquired'
    return f"{student} becomes a Python Master!"

print(python_master("You"))
    `.trim();

    let index = 0;
    function typeCode() {
        if (index < codeText.length) {
            codeElement.innerHTML += codeText.charAt(index);
            index++;
            setTimeout(typeCode, 50);
        }
    }
    typeCode();


    document.addEventListener('DOMContentLoaded', () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');
    
        burger.addEventListener('click', () => {
        
            nav.classList.toggle('nav-active');
    
          
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
    
        
            burger.classList.toggle('toggle');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });



    document.querySelectorAll('.feature-card, .pricing-card, .faq-item').forEach((el) => {
        observer.observe(el);
    });
});