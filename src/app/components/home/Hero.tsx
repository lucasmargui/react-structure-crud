// components/Hero.js
import Image from 'next/image';
import styles from './Hero.module.css'; // Import CSS Module for styling

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <h1 className={styles.title}>Welcome to Our Site</h1>
                <p className={styles.subtitle}>Your adventure starts here</p>
                <button className={styles.cta}>Get Started</button>
                
            </div>
            {/* Optional: Add an image */}
            <div className={styles.imageWrapper}>
                <Image
                    src="https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g"
                    alt="Hero Image"
                    fill // Utiliza a nova propriedade 'fill'
                    style={{ objectFit: 'cover' }} // Utiliza o estilo 'objectFit' diretamente
                    priority // Opcional: carrega a imagem com prioridade
                />
            </div>
        </section>
    );
};

export default Hero;