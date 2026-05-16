'use client';

import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function EmergencyPage() {
  const t = useTranslations('emergency');

  return (
    <main>
      <header>
        <h1>{t('title')}</h1>
      </header>
      <section>
        <p>{t('subtitle')}</p>

        {/* Emergency numbers */}
        <div className={styles['emergency-card']}>
          <h3>📞 {t('numbers')}</h3>
          <div className={styles['emergency-number']}>
            <a href="tel:911" className={styles['emergency-btn']}>
              🚨 911
            </a>
            <span>{t('desc_911')}</span>
          </div>
          <div className={styles['emergency-number']}>
            <a href="tel:*0311" className={styles['emergency-btn']}>
              📍 *0311
            </a>
            <span>{t('locatel')}</span>
          </div>
        </div>

        {/* CDMX hospitals */}
        <h3 className={styles['section-heading']}>{t('hospitals_cdmx')}</h3>
        <div className={styles['hospital-grid']}>
          <div className={styles['hospital-card']}>
            <h4>Centro Médico ABC - Santa Fe</h4>
            <p>
              📞 <a href="tel:5511031600">55 1103 1600</a>
            </p>
            <p>
              🌐{' '}
              <a href="https://centromedicoabc.com" target="_blank" rel="noopener noreferrer">
                centromedicoabc.com
              </a>
            </p>
            <p>
              <a
                href="https://maps.google.com/?q=Centro+Médico+ABC+Santa+Fe"
                target="_blank"
                rel="noopener noreferrer"
              >
                📍 {t('view_map')}
              </a>
            </p>
          </div>
          <div className={styles['hospital-card']}>
            <h4>Médica Sur</h4>
            <p>
              📞 <a href="tel:5554247200">55 5424 7200</a>
            </p>
            <p>
              🌐{' '}
              <a href="https://www.medicasur.com.mx" target="_blank" rel="noopener noreferrer">
                medicasur.com.mx
              </a>
            </p>
          </div>
          <div className={styles['hospital-card']}>
            <h4>Hospital Ángeles Pedregal</h4>
            <p>
              📞 <a href="tel:5556526987">55 5652 6987</a>
            </p>
            <p>
              🌐{' '}
              <a href="https://hospitalangeles.com/pedregal" target="_blank" rel="noopener noreferrer">
                hospitalangeles.com
              </a>
            </p>
          </div>
          <div className={styles['hospital-card']}>
            <h4>Hospital Español</h4>
            <p>
              📞 <a href="tel:5552559600">55 5255 9600</a>
            </p>
            <p>
              🌐{' '}
              <a href="https://www.hespanol.com" target="_blank" rel="noopener noreferrer">
                hespanol.com
              </a>
            </p>
          </div>
        </div>

        {/* Guadalajara hospitals */}
        <h3 className={styles['section-heading']}>{t('hospitals_gdl')}</h3>
        <div className={styles['hospital-grid']}>
          <div className={styles['hospital-card']}>
            <h4>Hospital San Javier</h4>
            <p>
              📞 <a href="tel:3336690222">33 3669 0222</a>
            </p>
            <p>
              🌐{' '}
              <a href="https://sanjavier.com.mx" target="_blank" rel="noopener noreferrer">
                sanjavier.com.mx
              </a>
            </p>
          </div>
          <div className={styles['hospital-card']}>
            <h4>Hospital Puerta de Hierro</h4>
            <p>
              📞 <a href="tel:3338482128">33 3848 2128</a>
            </p>
            <p>
              🌐{' '}
              <a href="https://hospitalespuertadehierro.com" target="_blank" rel="noopener noreferrer">
                hospitalespuertadehierro.com
              </a>
            </p>
          </div>
        </div>

        {/* Monterrey hospitals */}
        <h3 className={styles['section-heading']}>{t('hospitals_mty')}</h3>
        <div className={styles['hospital-grid']}>
          <div className={styles['hospital-card']}>
            <h4>TecSalud - Zambrano Hellion</h4>
            <p>
              📞 <a href="tel:8188880911">81 8888 0911</a>
            </p>
            <p>
              🌐{' '}
              <a href="https://www.tecsalud.mx" target="_blank" rel="noopener noreferrer">
                tecsalud.mx
              </a>
            </p>
          </div>
          <div className={styles['hospital-card']}>
            <h4>CHRISTUS MUGUERZA</h4>
            <p>
              📞 <a href="tel:8183993477">81 8399 3477</a>
            </p>
            <p>
              🌐{' '}
              <a href="https://christusmuguerza.com.mx" target="_blank" rel="noopener noreferrer">
                christusmuguerza.com.mx
              </a>
            </p>
          </div>
        </div>

        {/* Pharmacies */}
        <h3 className={styles['section-heading']}>{t('pharmacies')}</h3>
        <div className={styles['pharmacy-card']}>
          <h4>Farmacias del Ahorro</h4>
          <p>
            🌐{' '}
            <a href="https://www.fahorro.com" target="_blank" rel="noopener noreferrer">
              fahorro.com
            </a>
          </p>
        </div>
        <div className={styles['pharmacy-card']}>
          <h4>Farmacias Guadalajara</h4>
          <p>
            🌐{' '}
            <a href="https://www.farmaciasguadalajara.com" target="_blank" rel="noopener noreferrer">
              farmaciasguadalajara.com
            </a>
          </p>
        </div>

        {/* Te Protege México */}
        <div className={styles['featured-card']}>
          <h4>🛡️ Te Protege México</h4>
          <p>Plataforma de protección y asistencia para viajeros y residentes en México.</p>
          <p>
            🌐{' '}
            <a href="https://teprotejomexico.org/" target="_blank" rel="noopener noreferrer">
              teprotejomexico.org
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
