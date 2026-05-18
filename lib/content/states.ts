export interface Destination {
  name: string;
  url: string;
}

export interface State {
  name: string;
  destinations: Destination[];
}

export const states: State[] = [
  {
    name: 'Aguascalientes',
    destinations: [
      {
        name: 'San Jose de Gracia',
        url: 'https://tourimex.com/san-jose-de-gracia-aguascalientes-ags/',
      },
      {
        name: 'Real de Asientos',
        url: 'https://tourimex.com/real-de-asientos-aguascalientes-ags/',
      },
      { name: 'Calvillo', url: 'https://tourimex.com/calvillo-aguascalientes-ags/' },
    ],
  },
  {
    name: 'Baja California Sur',
    destinations: [
      {
        name: 'Cabo San Lucas',
        url: 'https://tourimex.com/cabo-san-lucas-baja-california-sur-bcs/',
      },
      {
        name: 'Playa Balandra',
        url: 'https://tourimex.com/playa-balandra-baja-california-sur-bcs/',
      },
      {
        name: 'Isla Espíritu Santo',
        url: 'https://tourimex.com/isla-espirito-santo-baja-california-sur-bcs/',
      },
      { name: 'La Paz', url: 'https://tourimex.com/la-paz-baja-california-sur-bcs/' },
      { name: 'Loreto', url: 'https://tourimex.com/loreto-baja-california-sur-bcs/' },
      { name: 'Cabo Pulmo', url: 'https://tourimex.com/cabo-pulmo-baja-california-sur-bcs/' },
    ],
  },
  {
    name: 'Baja California Norte',
    destinations: [
      { name: 'Ensenada', url: 'https://tourimex.com/ensenada-baja-california-norte-bcn/' },
      { name: 'Rosarito', url: 'https://tourimex.com/rosarito-baja-california-norte-bcn/' },
      { name: 'Tecate', url: 'https://tourimex.com/tecate-baja-california-norte-bcn/' },
    ],
  },
  {
    name: 'Campeche',
    destinations: [
      { name: 'Calakmul', url: 'https://tourimex.com/calakmul-campeche-cam/' },
      { name: 'Ciudad de Campeche', url: 'https://tourimex.com/ciudad-de-campeche-campeche-cam/' },
      { name: 'Champotón', url: 'https://tourimex.com/champoton-campeche-cam/' },
      { name: 'Ciudad del Carmen', url: 'https://tourimex.com/ciudad-del-carmen-campeche-cam/' },
      { name: 'Palizada', url: 'https://tourimex.com/palizada-campeche-cam/' },
      { name: 'Seybaplaya', url: 'https://tourimex.com/seybaplaya-campeche-cam/' },
    ],
  },
  {
    name: 'Chiapas',
    destinations: [
      { name: 'Bonampak', url: 'https://tourimex.com/bonampak-chiapas-chp/' },
      { name: 'Yaxchilán', url: 'https://tourimex.com/yaxchilan-chiapas-chp/' },
      { name: 'Agua Azul', url: 'https://tourimex.com/agua-azul-chiapas-chp/' },
      { name: 'Chiapa de Corzo', url: 'https://tourimex.com/chiapa-de-corzo-chiapas-chp/' },
      { name: 'Comitán', url: 'https://tourimex.com/comitan-chiapas-chp/' },
      { name: 'Ocosingo', url: 'https://tourimex.com/ocosingo-chiapas-chp/' },
      { name: 'Puerto Arista', url: 'https://tourimex.com/puerto-arista-chiapas-chp/' },
      {
        name: 'San Cristóbal de las Casas',
        url: 'https://tourimex.com/san-cristobal-de-las-casas-chiapas-chp/',
      },
      { name: 'Palenque', url: 'https://tourimex.com/palenque-chiapas-chp/' },
    ],
  },
  {
    name: 'Chihuahua',
    destinations: [
      { name: 'Batopilas', url: 'https://tourimex.com/batopilas-chihuahua-chh/' },
      { name: 'Casas Grandes', url: 'https://tourimex.com/casas-grandes-chihuahua-chh/' },
      { name: 'Creel', url: 'https://tourimex.com/creel-chihuahua-chh/' },
    ],
  },
  {
    name: 'Coahuila',
    destinations: [
      { name: 'Viesca y Parras', url: 'https://tourimex.com/viesca-y-parras-coahuila-coa/' },
      { name: 'Melchor Múzquiz', url: 'https://tourimex.com/melchor-muzquiz-coahuila-coa/' },
      { name: 'Guerrero', url: 'https://tourimex.com/guerrero-coahuila-coa/' },
      { name: 'Candela', url: 'https://tourimex.com/candela-coahuila-coa/' },
      { name: 'Arteaga', url: 'https://tourimex.com/arteaga-coahuila-coa/' },
      { name: 'Cuatro Ciénagas', url: 'https://tourimex.com/cuatro-cienagas-coahuila-coa/' },
      {
        name: 'Parras de la Fuente',
        url: 'https://tourimex.com/parras-de-la-fuente-coahuila-coa/',
      },
    ],
  },
  {
    name: 'Colima',
    destinations: [
      { name: 'Comala', url: 'https://tourimex.com/comala-colima-col/' },
      { name: 'Cuyutlán', url: 'https://tourimex.com/cuyutlan-colima-col/' },
      { name: 'Manzanillo', url: 'https://tourimex.com/manzanillo-colima-col/' },
    ],
  },
  {
    name: 'Durango',
    destinations: [
      { name: 'Nombre de Dios', url: 'https://tourimex.com/nombre-de-dios-durango-dur/' },
      { name: 'Mapimí', url: 'https://tourimex.com/mapimi-durango-dur/' },
    ],
  },
  {
    name: 'Estado de México',
    destinations: [
      {
        name: 'Aculco de Espinoza',
        url: 'https://tourimex.com/aculco-de-espinoza-estado-de-mexico-mex/',
      },
      {
        name: 'El Oro de Hidalgo',
        url: 'https://tourimex.com/el-oro-de-hidalgo-estado-de-mexico-mex/',
      },
      { name: 'Malinalco', url: 'https://tourimex.com/malinalco-estado-de-mexico-mex/' },
      { name: 'Metepec', url: 'https://tourimex.com/metepec-estado-de-mexico-mex/' },
      { name: 'Tepotzotlán', url: 'https://tourimex.com/tepotzotlan-estado-de-mexico-mex/' },
      { name: 'Valle de Bravo', url: 'https://tourimex.com/valle-de-bravo-estado-de-mexico-mex/' },
      {
        name: 'Ixtapan de la Sal',
        url: 'https://tourimex.com/ixtapan-de-la-sal-estado-de-mexico-mex/',
      },
      {
        name: 'Villa del Carbón',
        url: 'https://tourimex.com/villa-del-carbon-estado-de-mexico-mex/',
      },
      {
        name: 'San Martín de las Pirámides',
        url: 'https://tourimex.com/san-martin-de-las-piramides-estado-de-mexico-mex/',
      },
    ],
  },
  {
    name: 'Guanajuato',
    destinations: [
      { name: 'Guanajuato', url: 'https://tourimex.com/guanajuato-guanajuato-gua/' },
      { name: 'Comonfort', url: 'https://tourimex.com/comonfort-guanajuato-gua/' },
      { name: 'Dolores Hidalgo', url: 'https://tourimex.com/dolores-hidalgo-guanajuato-gua/' },
      { name: 'Jalpa', url: 'https://tourimex.com/jalpa-guanajuato-gua/' },
      { name: 'Mineral de Pozos', url: 'https://tourimex.com/mineral-de-pozos-guanajuato-gua/' },
      { name: 'Salvatierra', url: 'https://tourimex.com/salvatierra-guanajuato-gua/' },
      {
        name: 'San Miguel de Allende',
        url: 'https://tourimex.com/san-miguel-de-allende-guanajuato-gua/',
      },
      { name: 'Yuriria', url: 'https://tourimex.com/yuriria-guanajuato-gua/' },
    ],
  },
  {
    name: 'Guerrero',
    destinations: [
      { name: 'Acapulco', url: 'https://tourimex.com/acapulco-guerrero-gro/' },
      { name: 'Barra Vieja', url: 'https://tourimex.com/barra-vieja-guerrero-gro/' },
      { name: 'Ixtapa-Zihuatanejo', url: 'https://tourimex.com/ixtapa-zihuatanejo-guerrero-gro/' },
      { name: 'Marquelia', url: 'https://tourimex.com/marquelia-guerrero-gro/' },
      { name: 'Pie de la Cuesta', url: 'https://tourimex.com/pie-de-la-cuesta-guerrero-gro/' },
      { name: 'Taxco de Alarcón', url: 'https://tourimex.com/taxco-guerrero-gro/' },
    ],
  },
  {
    name: 'Hidalgo',
    destinations: [
      { name: 'Real del Monte', url: 'https://tourimex.com/real-del-monte-hidalgo-hid/' },
      {
        name: 'Grutas de Tolantongo',
        url: 'https://tourimex.com/grutas-de-tolantongo-hidalgo-hid/',
      },
      { name: 'Huasca de Ocampo', url: 'https://tourimex.com/huasca-de-ocampo-hidalgo-hid/' },
      { name: 'Huichapan', url: 'https://tourimex.com/huichapan-hidalgo-hid/' },
      { name: 'Mineral del Chico', url: 'https://tourimex.com/mineral-del-chico-hidalgo-hid/' },
      { name: 'Tecozautla', url: 'https://tourimex.com/tecozautla-hidalgo-hid/' },
    ],
  },
  {
    name: 'Jalisco',
    destinations: [
      { name: 'Guadalajara', url: 'https://tourimex.com/guadalajara-jalisco-jal/' },
      {
        name: 'San Pedro Tlaquepaque',
        url: 'https://tourimex.com/san-pedro-tlaquepaque-jalisco-jal/',
      },
      { name: 'Mascota', url: 'https://tourimex.com/mascota-jalisco-jal-2/' },
      { name: 'Barra de Navidad', url: 'https://tourimex.com/barra-de-navidad-jalisco-jal/' },
      {
        name: 'Colomitos – Boca de Tomatlán',
        url: 'https://tourimex.com/colomitos-boca-de-tomatlan-jalisco-jal/',
      },
      { name: 'Cabo Corrientes', url: 'https://tourimex.com/cabo-corrientes-jalisco-jal/' },
      { name: 'Ribera de Chapala', url: 'https://tourimex.com/ribera-de-chapala-jalisco-jal/' },
      { name: 'Chamela', url: 'https://tourimex.com/chamela-jalisco-jal/' },
      { name: 'Costa Careyes', url: 'https://tourimex.com/costa-careyes-jalisco-jal/' },
    ],
  },
  {
    name: 'Michoacán',
    destinations: [
      { name: 'Morelia', url: 'https://tourimex.com/morelia-michoacan-mic/' },
      { name: 'Paricutín', url: 'https://tourimex.com/paricutin-michoacan-mic/' },
      {
        name: 'Cuitzeo del Porvenir',
        url: 'https://tourimex.com/cuitzeo-del-porvenir-michoacan-mic/',
      },
      { name: 'Jiquilpan', url: 'https://tourimex.com/jiquilpan-michoacan-mic/' },
      {
        name: 'Mineral de Angangueo',
        url: 'https://tourimex.com/mineral-de-angangueo-michoacan-mic/',
      },
      { name: 'Barra de Nexpa', url: 'https://tourimex.com/barra-de-nexpa-michoacan-mic/' },
      { name: 'Maruata', url: 'https://tourimex.com/maruata-michoacan-mic/' },
      { name: 'Pátzcuaro', url: 'https://tourimex.com/patzcuaro-michoacan-mic/' },
      { name: 'Playa Azul', url: 'https://tourimex.com/playa-azul-michoacan-mic/' },
    ],
  },
  {
    name: 'Morelos',
    destinations: [
      { name: 'Cuernavaca', url: 'https://tourimex.com/cuernavaca-morelos-mor/' },
      { name: 'Tepoztlán', url: 'https://tourimex.com/tepoztlan-morelos-mor/' },
      { name: 'Tlayacapan', url: 'https://tourimex.com/tlayacapan-morelos-mor/' },
    ],
  },
  {
    name: 'Nayarit',
    destinations: [
      { name: 'Bucerías', url: 'https://tourimex.com/bucerias-nayarit-nay/' },
      { name: 'Chacala', url: 'https://tourimex.com/chacala-nayarit-nay/' },
      { name: 'Cruz de Huanacaxtle', url: 'https://tourimex.com/cruz-de-huanacaxtle-nayarit-nay/' },
      { name: 'Jala', url: 'https://tourimex.com/jala-nayarit-nay/' },
      { name: 'Nuevo Vallarta', url: 'https://tourimex.com/nuevo-vallarta-nayarit-nay/' },
      { name: 'Punta de Mita', url: 'https://tourimex.com/punta-de-mita-nayarit-nay/' },
      {
        name: 'Rincón de Guayabitos',
        url: 'https://tourimex.com/rincon-de-guayabitos-nayarit-nay/',
      },
      { name: 'San Blas', url: 'https://tourimex.com/san-blas-nayarit-nay/' },
      { name: 'San Francisco', url: 'https://tourimex.com/san-francisco-nayarit-nay/' },
    ],
  },
  {
    name: 'Nuevo León',
    destinations: [
      { name: 'Bustamante', url: 'https://tourimex.com/bustamante-nuevo-leon-nle/' },
      { name: 'Linares', url: 'https://tourimex.com/linares-nuevo-leon-nle/' },
      { name: 'Santiago', url: 'https://tourimex.com/santiago-nuevo-leon-nle/' },
    ],
  },
  {
    name: 'Oaxaca',
    destinations: [
      {
        name: 'San Pedro y San Pablo Teposcolula',
        url: 'https://tourimex.com/san-pedro-y-san-pablo-teposcolula-oaxaca-oax/',
      },
      { name: 'Huautla de Jiménez', url: 'https://tourimex.com/huautla-de-jimenez-oaxaca-oax/' },
      { name: 'Ciudad de Oaxaca', url: 'https://tourimex.com/ciudad-de-oaxaca-oaxaca-oax/' },
      { name: 'Mitla', url: 'https://tourimex.com/mitla-oaxaca-oax/' },
      { name: 'Monte Albán', url: 'https://tourimex.com/4954/' },
      { name: 'Bahías de Huatulco', url: 'https://tourimex.com/bahias-de-huatulco-oaxaca-oax/' },
      {
        name: 'Capulálpam de Méndez',
        url: 'https://tourimex.com/calpulalpam-de-mendez-oaxaca-oax/',
      },
      { name: 'Mazunte', url: 'https://tourimex.com/mazunte-oaxaca-oax/' },
      { name: 'Puerto Escondido', url: 'https://tourimex.com/puerto-escondido-oaxaca-oax/' },
    ],
  },
  {
    name: 'Puebla',
    destinations: [
      { name: 'Puebla', url: 'https://tourimex.com/puebla-puebla-pue/' },
      { name: 'Atlixco', url: 'https://tourimex.com/atlixco-puebla-pue/' },
      { name: 'Chignahuapan', url: 'https://tourimex.com/chignahuapan-puebla-pue/' },
      { name: 'Cholula', url: 'https://tourimex.com/cholula-puebla-pue/' },
      { name: 'Huauchinango', url: 'https://tourimex.com/huauchinango-puebla-pue/' },
      { name: 'Pahuatlán', url: 'https://tourimex.com/pahuatlan-puebla-pue/' },
      {
        name: 'Cuetzalan del Progreso',
        url: 'https://tourimex.com/cuetzalan-del-progreso-puebla-pue/',
      },
      { name: 'Tlatlauquitepec', url: 'https://tourimex.com/tlatlauquitepec-puebla-pue/' },
      { name: 'Xicotepec', url: 'https://tourimex.com/xicotepec-puebla-pue/' },
    ],
  },
  {
    name: 'Querétaro',
    destinations: [
      { name: 'Querétaro', url: 'https://tourimex.com/queretaro-queretaro-que/' },
      { name: 'Peña de Bernal', url: 'https://tourimex.com/pena-de-bernal-queretaro-que/' },
      { name: 'Amealco de Bonfil', url: 'https://tourimex.com/amealco-de-bonfil-queretaro-que/' },
      {
        name: 'Cadereyta de Montes',
        url: 'https://tourimex.com/cadereyta-de-montes-queretaro-que/',
      },
      { name: 'Jalpan de Serra', url: 'https://tourimex.com/jalpan-de-serra-queretaro-que/' },
      { name: 'Tequisquiapan', url: 'https://tourimex.com/tequisquiapan-queretaro-que/' },
      { name: 'San Joaquín', url: 'https://tourimex.com/san-joaquin-queretaro-que/' },
    ],
  },
  {
    name: 'Quintana Roo',
    destinations: [
      { name: 'Akumal', url: 'https://tourimex.com/akumal-quintana-roo-roo/' },
      { name: 'Bacalar', url: 'https://tourimex.com/bacalar-quintana-roo-roo/' },
      { name: 'Cancún', url: 'https://tourimex.com/cancun-quintana-roo-roo/' },
      { name: 'Cobá', url: 'https://tourimex.com/coba-quintana-roo-roo/' },
      { name: 'Cozumel', url: 'https://tourimex.com/cozumel-quintana-roo-roo/' },
      { name: 'Holbox', url: 'https://tourimex.com/holbox-quintana-roo-roo/' },
      { name: 'Isla Mujeres', url: 'https://tourimex.com/isla-mujeres-quintana-roo-roo/' },
      { name: 'Majahual', url: 'https://tourimex.com/majahual-quintana-roo-roo/' },
      { name: 'Playa del Carmen', url: 'https://tourimex.com/playa-del-carmen-quintana-roo-roo/' },
      { name: 'Tulum', url: 'https://tourimex.com/tulum-quintana-roo-roo/' },
      { name: 'Puerto Morelos', url: 'https://tourimex.com/puerto-morelos-quintana-roo-roo/' },
    ],
  },
  {
    name: 'San Luis Potosí',
    destinations: [
      { name: 'San Luis Potosí', url: 'https://tourimex.com/san-luis-potosi-san-luis-potosi-slp/' },
      { name: 'Tamul', url: 'https://tourimex.com/tamul-san-luis-potosi-slp/' },
      {
        name: 'Sótano de las Golondrinas',
        url: 'https://tourimex.com/sotano-de-las-golondrinas-san-luis-potosi-slp/',
      },
      {
        name: 'Río Verde y La Media Luna',
        url: 'https://tourimex.com/rio-verde-y-la-media-luna-san-luis-potosi-slp/',
      },
      { name: 'Puente de Dios', url: 'https://tourimex.com/puente-de-dios-san-luis-potosi-slp/' },
      { name: 'Aquismón', url: 'https://tourimex.com/aquismon-san-luis-potosi-slp/' },
      {
        name: 'La Huasteca Potosina',
        url: 'https://tourimex.com/la-huasteca-potosina-san-luis-potosi-slp/',
      },
      { name: 'Real de Catorce', url: 'https://tourimex.com/real-de-catorce-san-luis-potosi-slp/' },
      { name: 'Xilitla', url: 'https://tourimex.com/xilitla-san-luis-potosi-slp/' },
    ],
  },
  {
    name: 'Sinaloa',
    destinations: [
      { name: 'Cosalá', url: 'https://tourimex.com/cosala-sinaloa-sin/' },
      { name: 'El Fuerte', url: 'https://tourimex.com/el-fuerte-sinaloa-sin/' },
      { name: 'El Rosario', url: 'https://tourimex.com/el-rosario-sinaloa-sin/' },
      { name: 'Mazatlán', url: 'https://tourimex.com/mazatlan-sinaloa-sin/' },
      { name: 'Topolobampo', url: 'https://tourimex.com/topolobampo-sinaloa-sin/' },
      { name: 'Mocorito', url: 'https://tourimex.com/mocorito-sinaloa-sin/' },
    ],
  },
  {
    name: 'Sonora',
    destinations: [
      { name: 'Magdalena de Kino', url: 'https://tourimex.com/magdalena-de-kino-sonora-son/' },
      { name: 'Álamos', url: 'https://tourimex.com/alamos-sonora-son/' },
      { name: 'Bahía de Kino', url: 'https://tourimex.com/bahia-de-kino-sonora-son/' },
      { name: 'San Carlos', url: 'https://tourimex.com/san-carlos-sonora-son/' },
      { name: 'Guaymas', url: 'https://tourimex.com/guaymas-sonora-son/' },
      { name: 'Puerto Peñasco', url: 'https://tourimex.com/puerto-penasco-sonora-son/' },
    ],
  },
  {
    name: 'Tabasco',
    destinations: [
      { name: 'Villahermosa', url: 'https://tourimex.com/villahermosa-tabasco-tab/' },
      { name: 'Tapijulapa', url: 'https://tourimex.com/tapijulapa-tabasco-tab/' },
    ],
  },
  {
    name: 'Tamaulipas',
    destinations: [
      { name: 'Mier', url: 'https://tourimex.com/mier-tamaulipas-tam/' },
      { name: 'Tula', url: 'https://tourimex.com/tula-tamaulipas-tam/' },
    ],
  },
  {
    name: 'Tlaxcala',
    destinations: [
      { name: 'Tlaxcala', url: 'https://tourimex.com/tlaxcala-tlaxcala-tla/' },
      { name: 'Huamantla', url: 'https://tourimex.com/huamantla-tlaxcala-tla/' },
      { name: 'Tlaxco', url: 'https://tourimex.com/tlaxco-tlaxcala-tla/' },
    ],
  },
  {
    name: 'Veracruz',
    destinations: [
      { name: 'Xalapa', url: 'https://tourimex.com/xalapa-veracruz-ver/' },
      { name: 'Papantla', url: 'https://tourimex.com/papantla-veracruz-ver/' },
      { name: 'Barra de Nautla', url: 'https://tourimex.com/barra-de-nautla-veracruz-ver/' },
      { name: 'Boca del Río', url: 'https://tourimex.com/boca-del-rio-veracruz-ver/' },
      { name: 'Coatepec', url: 'https://tourimex.com/coatepec-veracruz-ver/' },
      { name: 'Coscomatepec', url: 'https://tourimex.com/coscomatepec-veracruz-ver/' },
      { name: 'Monte Gordo', url: 'https://tourimex.com/monte-gordo-veracruz-ver/' },
      { name: 'Cumbre Tajín', url: 'https://tourimex.com/cumbre-tajin-veracruz-ver/' },
      {
        name: 'La Isla de en Medio',
        url: 'https://tourimex.com/la-isla-de-en-medio-veracruz-ver/',
      },
      { name: 'Antón Lizardo', url: 'https://tourimex.com/anton-lizardo-veracruz-ver/' },
      { name: 'La Vigueta', url: 'https://tourimex.com/la-vigueta-veracruz-ver/' },
      { name: 'Punta Roca Partida', url: 'https://tourimex.com/punta-roca-partida-veracruz-ver/' },
      { name: 'Playa Montepío', url: 'https://tourimex.com/playa-montepio-veracruz-ver/' },
      { name: 'Catemaco', url: 'https://tourimex.com/catemaco-veracruz-ver/' },
      { name: 'La Antigua', url: 'https://tourimex.com/la-antigua-veracruz-ver/' },
      { name: 'Chachalacas', url: 'https://tourimex.com/chachalacas-veracruz-ver/' },
      { name: 'Cancuncito', url: 'https://tourimex.com/cancuncito-veracruz-ver/' },
      { name: 'Puerto Veracruz', url: 'https://tourimex.com/puerto-veracruz-veracruz-ver/' },
      { name: 'Tecolutla', url: 'https://tourimex.com/tecolutla-veracruz-ver/' },
      { name: 'Xico', url: 'https://tourimex.com/xico-veracruz-ver/' },
      { name: 'Zozocolco', url: 'https://tourimex.com/zozocolco-veracruz-ver/' },
      // Irregular link preserved for parity with legacy
      { name: 'Orizaba', url: 'https://tourimex.com/category/pueblos-magicos/' },
    ],
  },
  {
    name: 'Yucatán',
    destinations: [
      { name: 'Mérida', url: 'https://tourimex.com/merida-yucatan-yuc/' },
      { name: 'Chichén Itzá', url: 'https://tourimex.com/chichen-itza-yucatan-yuc/' },
      { name: 'Izamal', url: 'https://tourimex.com/izamal-yucatan-yuc/' },
      { name: 'Puerto Progreso', url: 'https://tourimex.com/puerto-progreso-yucatan-yuc/' },
      { name: 'Sisal', url: 'https://tourimex.com/sisal-yucatan-yuc/' },
      { name: 'Puerto Telchac', url: 'https://tourimex.com/puerto-telchac-yucatan-yuc/' },
      { name: 'Uxmal', url: 'https://tourimex.com/uxmal-yucatan-yuc/' },
      { name: 'Valladolid', url: 'https://tourimex.com/valladolid-yucatan-yuc/' },
    ],
  },
  {
    name: 'Zacatecas',
    destinations: [
      { name: 'Zacatecas', url: 'https://tourimex.com/zacatecas-zacatecas-zac/' },
      { name: 'Sombrerete', url: 'https://tourimex.com/sombrerete-zacatecas-zac/' },
      {
        name: 'Teúl de González Ortega',
        url: 'https://tourimex.com/teul-de-gonzalez-ortega-zacatecas-zac/',
      },
      { name: 'Pinos', url: 'https://tourimex.com/pinos-zacatecas-zac/' },
      {
        name: 'Nochistlán de Mejía',
        url: 'https://tourimex.com/nochistlan-de-mejia-zacatecas-zac/',
      },
      {
        name: 'Jerez de García Salinas',
        url: 'https://tourimex.com/jerez-de-garcia-salinas-zacatecas-zac/',
      },
      { name: 'Guadalupe', url: 'https://tourimex.com/guadalupe-zacatecas-zac/' },
    ],
  },
];
