/* =====================================================================
 * huiskeuring.be - EXTERNAL LINKS
 * =====================================================================
 *
 * Every link that leaves this website lives here. Nothing else in the
 * project should hard-code an external URL, so a broken-link sweep only
 * ever has to look at this file plus the `sources` arrays in legal.js.
 *
 * Maintenance
 * -----------
 *  - Run a link check over LINK_GROUPS + legal.js `sources` every 6 months.
 *  - All URLs must be https. The renderer refuses anything else.
 *  - `regions` limits a link to specific regions; omit it for national links.
 *
 * Last full link check: 2026-07-28 (all entries returned HTTP 200)
 * ===================================================================== */

const LINKS_META = {
    lastCheck: '2026-07-28',
    checkIntervalMonths: 6
};

const LINK_GROUPS = [
    {
        id: 'property-data',
        icon: 'fa-map',
        title: {
            en: 'Property & land registry data',
            nl: 'Eigendoms- en kadastergegevens',
            fr: 'Données cadastrales et immobilières'
        },
        intro: {
            en: 'Find out what you are really buying: boundaries, surface, cadastral income and building history.',
            nl: 'Ontdek wat u echt koopt: grenzen, oppervlakte, kadastraal inkomen en bouwgeschiedenis.',
            fr: 'Découvrez ce que vous achetez vraiment : limites, superficie, revenu cadastral et historique du bâtiment.'
        },
        links: [
            {
                url: 'https://ccff02.minfin.fgov.be/cadgisweb/',
                label: { en: 'CadGIS - free cadastral map viewer', nl: 'CadGIS - gratis kadasterkaart', fr: 'CadGIS - plan cadastral gratuit' },
                note: { en: 'Look up plot boundaries and building outlines for any address.', nl: 'Zoek perceelsgrenzen en gebouwomtrekken op voor elk adres.', fr: 'Consultez les limites de parcelle et l\'emprise des bâtiments pour toute adresse.' }
            },
            {
                url: 'https://financien.belgium.be/nl/particulieren/woning/kadaster',
                label: { en: 'Kadaster / Cadastre - official information', nl: 'Kadaster - officiële informatie', fr: 'Cadastre - informations officielles' },
                note: { en: 'Extracts, cadastral income and property tax basics.', nl: 'Uittreksels, kadastraal inkomen en onroerende voorheffing.', fr: 'Extraits, revenu cadastral et bases du précompte immobilier.' }
            },
            {
                url: 'https://eservices.minfin.fgov.be/myminfin-web/',
                label: { en: 'MyMinfin', nl: 'MyMinfin', fr: 'MyMinfin' },
                note: { en: 'Request cadastral extracts and consult your own property data.', nl: 'Vraag kadastrale uittreksels aan en raadpleeg uw eigen vastgoedgegevens.', fr: 'Demandez des extraits cadastraux et consultez vos données immobilières.' }
            },
            {
                url: 'https://woningpas.vlaanderen.be/',
                regions: ['flanders'],
                label: { en: 'Woningpas', nl: 'Woningpas', fr: 'Woningpas' },
                note: { en: 'Digital passport of a Flemish home: EPC, permits, soil, flood and subsidies in one place.', nl: 'Digitaal paspoort van een Vlaamse woning: EPC, vergunningen, bodem, water en premies op één plek.', fr: 'Passeport numérique d\'un logement flamand : PEB, permis, sol, inondation et primes au même endroit.' }
            },
            {
                url: 'https://www.geopunt.be/',
                regions: ['flanders'],
                label: { en: 'Geopunt Vlaanderen', nl: 'Geopunt Vlaanderen', fr: 'Geopunt Flandre' },
                note: { en: 'Flemish geoportal: zoning plans, aerial photos, environment and flood layers.', nl: 'Vlaams geoportaal: bestemmingsplannen, luchtfoto\'s, milieu- en waterlagen.', fr: 'Géoportail flamand : plans d\'affectation, photos aériennes, couches environnement et inondation.' }
            },
            {
                url: 'https://geoportail.wallonie.be/',
                regions: ['wallonia'],
                label: { en: 'Géoportail de la Wallonie', nl: 'Géoportail van Wallonië', fr: 'Géoportail de la Wallonie' },
                note: { en: 'Walloon geoportal with cadastral, planning and flood layers.', nl: 'Waals geoportaal met kadaster-, planning- en overstromingslagen.', fr: 'Géoportail wallon : couches cadastrales, urbanistiques et d\'inondation.' }
            },
            {
                url: 'https://www.dov.vlaanderen.be/page/plastische-gronden',
                regions: ['flanders'],
                label: { en: 'Plastic (swelling clay) soils map - DOV', nl: 'Kaart plastische gronden - DOV', fr: 'Carte des sols plastiques (argile gonflante) - DOV' },
                note: { en: 'Shows where the subsoil is sensitive to swelling and shrinking clay - the cause of drought cracks.', nl: 'Toont waar de ondergrond gevoelig is voor zwellende en krimpende klei - de oorzaak van droogtescheuren.', fr: 'Montre où le sous-sol est sensible au gonflement et au retrait de l\'argile - cause des fissures de sécheresse.' }
            },
            {
                url: 'https://www.dov.vlaanderen.be/page/registratie-droogteschade-aan-de-woning',
                regions: ['flanders'],
                label: { en: 'Drought damage register', nl: 'Registratiepunt droogteschade', fr: 'Registre des dégâts de sécheresse' },
                note: { en: 'Report cracks wider than 3 mm or tilting caused by drought - and see what qualifies as significant.', nl: 'Meld scheuren breder dan 3 mm of scheefstelling door droogte - en zie wat als betekenisvol geldt.', fr: 'Signalez les fissures de plus de 3 mm ou un basculement dus à la sécheresse - et voyez ce qui est significatif.' }
            }
        ]
    },
    {
        id: 'water',
        icon: 'fa-water',
        title: {
            en: 'Water & flood risk maps',
            nl: 'Water- en overstromingskaarten',
            fr: 'Cartes de l\'eau et du risque d\'inondation'
        },
        intro: {
            en: 'Flood risk affects insurability, resale value and permits. Always check the official maps yourself.',
            nl: 'Overstromingsrisico beïnvloedt verzekerbaarheid, verkoopwaarde en vergunningen. Controleer de officiële kaarten altijd zelf.',
            fr: 'Le risque d\'inondation influence l\'assurabilité, la valeur de revente et les permis. Consultez toujours les cartes officielles vous-même.'
        },
        links: [
            {
                url: 'https://www.waterinfo.be/kaarten',
                regions: ['flanders'],
                label: { en: 'Waterinfo.be - official flood maps', nl: 'Waterinfo.be - officiële overstromingskaarten', fr: 'Waterinfo.be - cartes officielles d\'inondation' },
                note: { en: 'Flood-sensitive areas, water levels and forecasts for Flanders.', nl: 'Overstromingsgevoelige gebieden, waterpeilen en voorspellingen voor Vlaanderen.', fr: 'Zones sensibles, niveaux d\'eau et prévisions pour la Flandre.' }
            },
            {
                url: 'https://www.vlaanderen.be/watertoets',
                regions: ['flanders'],
                label: { en: 'Watertoets - P-score and G-score', nl: 'Watertoets - P-score en G-score', fr: 'Watertoets - scores P et G' },
                note: { en: 'How the scores work and what the seller must disclose.', nl: 'Hoe de scores werken en wat de verkoper moet meedelen.', fr: 'Fonctionnement des scores et obligations du vendeur.' }
            },
            {
                url: 'https://www.vmm.be/',
                regions: ['flanders'],
                label: { en: 'Vlaamse Milieumaatschappij (VMM)', nl: 'Vlaamse Milieumaatschappij (VMM)', fr: 'Agence flamande pour l\'environnement (VMM)' },
                note: { en: 'Water quality, water management and flood policy.', nl: 'Waterkwaliteit, waterbeheer en overstromingsbeleid.', fr: 'Qualité de l\'eau, gestion de l\'eau et politique des inondations.' }
            },
            {
                url: 'https://geoportail.wallonie.be/',
                regions: ['wallonia'],
                label: { en: 'Géoportail - aléa d\'inondation', nl: 'Géoportail - overstromingsgevaar', fr: 'Géoportail - aléa d\'inondation' },
                note: { en: 'Walloon flood hazard and risk mapping.', nl: 'Waalse kartering van overstromingsgevaar en -risico.', fr: 'Cartographie wallonne de l\'aléa et du risque d\'inondation.' }
            },
            {
                url: 'https://environnement.brussels/',
                regions: ['brussels'],
                label: { en: 'Bruxelles Environnement', nl: 'Leefmilieu Brussel', fr: 'Bruxelles Environnement' },
                note: { en: 'Brussels environment, water and soil information.', nl: 'Brusselse informatie over milieu, water en bodem.', fr: 'Informations bruxelloises sur l\'environnement, l\'eau et le sol.' }
            },
            {
                url: 'https://omgeving.vlaanderen.be/nl/verordeningen/de-gewestelijke-hemelwaterverordening-2023',
                regions: ['flanders'],
                label: { en: 'Rainwater regulation (GSV Hemelwater 2023)', nl: 'Hemelwaterverordening (GSV 2023)', fr: 'Règlement sur l\'eau de pluie (GSV 2023)' },
                note: { en: 'What you must install for rainwater since 2 October 2023 - also for permit-exempt works.', nl: 'Wat u sinds 2 oktober 2023 moet plaatsen voor hemelwater - ook bij vergunningsvrije werken.', fr: 'Ce que vous devez installer pour l\'eau de pluie depuis le 2 octobre 2023 - même sans permis.' }
            },
            {
                url: 'https://groenblauwpeil.be/',
                regions: ['flanders', 'wallonia', 'brussels'],
                label: { en: 'Groenblauwpeil - rainwater requirement calculator', nl: 'Groenblauwpeil - bereken uw hemelwatereisen', fr: 'Groenblauwpeil - calculez vos exigences pluviales' },
                note: { en: 'Free tool that calculates the tank and infiltration volume your project needs.', nl: 'Gratis tool die het benodigde put- en infiltratievolume voor uw project berekent.', fr: 'Outil gratuit calculant le volume de citerne et d\'infiltration requis.' }
            },
            {
                url: 'https://www.vlaanderen.be/verplichte-keuring-van-priveriolering-voor-afvoer-van-afval-of-regenwater',
                regions: ['flanders'],
                label: { en: 'Compulsory private drainage inspection', nl: 'Verplichte keuring privéwaterafvoer', fr: 'Contrôle obligatoire de l\'évacuation privée' },
                note: { en: 'When the inspection is required and what the inspector checks.', nl: 'Wanneer de keuring verplicht is en wat de keurder controleert.', fr: 'Quand le contrôle est requis et ce que le contrôleur vérifie.' }
            },
            {
                url: 'https://environnement.brussels/citoyen/reglementation-et-inspection/obligations-et-autorisations/gestion-des-eaux-de-pluie',
                regions: ['brussels'],
                label: { en: 'Rainwater management obligations (Brussels)', nl: 'Verplichtingen hemelwaterbeheer (Brussel)', fr: 'Obligations de gestion des eaux de pluie (Bruxelles)' },
                note: { en: 'Tank sizing (33 l/m² of roof), the "zero discharge" rule and the two official calculators.', nl: 'Dimensionering van de put (33 l/m² dak), de regel "nul lozing" en de twee officiële rekenbladen.', fr: 'Dimensionnement de la citerne (33 l/m² de toiture), la règle du « 0 rejet » et les deux calculateurs officiels.' }
            }
        ]
    },
    {
        id: 'energy',
        icon: 'fa-bolt',
        title: {
            en: 'Energy, EPC & renovation obligation',
            nl: 'Energie, EPC en renovatieverplichting',
            fr: 'Énergie, PEB et obligation de rénovation'
        },
        intro: {
            en: 'The energy label is not just a sticker - in Flanders it comes with a legal renovation obligation.',
            nl: 'Het energielabel is niet zomaar een sticker - in Vlaanderen hangt er een wettelijke renovatieverplichting aan vast.',
            fr: 'Le label énergétique n\'est pas qu\'un autocollant : en Flandre, il s\'accompagne d\'une obligation légale de rénovation.'
        },
        links: [
            {
                url: 'https://www.vlaanderen.be/energieprestatiecertificaten-epcs',
                regions: ['flanders'],
                label: { en: 'EPC - Energieprestatiecertificaat', nl: 'EPC - Energieprestatiecertificaat', fr: 'EPC - certificat de performance énergétique (Flandre)' },
                note: { en: 'What the certificate means and how to read it.', nl: 'Wat het certificaat betekent en hoe u het leest.', fr: 'Signification du certificat et comment le lire.' }
            },
            {
                url: 'https://www.vlaanderen.be/renovatieverplichting-voor-residentiele-gebouwen',
                regions: ['flanders'],
                label: { en: 'Renovation obligation for residential buildings', nl: 'Renovatieverplichting voor residentiële gebouwen', fr: 'Obligation de rénovation des bâtiments résidentiels' },
                note: { en: 'Label E/F must reach label D within 6 years of the deed.', nl: 'Label E/F moet binnen 6 jaar na de akte label D halen.', fr: 'Le label E/F doit atteindre le label D dans les 6 ans suivant l\'acte.' }
            },
            {
                url: 'https://www.vlaanderen.be/bouwen-wonen-en-energie/veilig-gezond-en-kwaliteitsvol-wonen/woningkwaliteitsnormen/minimaal-epc-label-vanaf-2030',
                regions: ['flanders'],
                label: { en: 'Minimum EPC label for rentals from 2030', nl: 'Minimaal EPC-label voor huurwoningen vanaf 2030', fr: 'Label PEB minimum pour la location dès 2030' },
                note: { en: 'Phased minimum labels for rented homes up to 2040.', nl: 'Gefaseerde minimumlabels voor huurwoningen tot 2040.', fr: 'Labels minimaux progressifs pour les logements loués jusqu\'en 2040.' }
            },
            {
                url: 'https://www.wallonie.be/fr/demarches/obtenir-un-certificat-peb',
                regions: ['wallonia'],
                label: { en: 'Certificat PEB (Wallonia)', nl: 'PEB-certificaat (Wallonië)', fr: 'Certificat PEB (Wallonie)' },
                note: { en: 'Walloon energy performance certificate.', nl: 'Waals energieprestatiecertificaat.', fr: 'Certificat de performance énergétique wallon.' }
            },
            {
                url: 'https://environnement.brussels/citoyen/reglementation-et-inspection/obligations-et-autorisations/le-certificat-peb-dun-logement-en-region-bruxelloise',
                regions: ['brussels'],
                label: { en: 'Certificat PEB for a Brussels dwelling', nl: 'EPB-certificaat voor een Brusselse woning', fr: 'Certificat PEB d\'un logement bruxellois' },
                note: { en: 'Valid 10 years, mandatory at sale and rental.', nl: '10 jaar geldig, verplicht bij verkoop en verhuur.', fr: 'Valable 10 ans, obligatoire à la vente et à la location.' }
            },
            {
                url: 'https://leefmilieu.brussels/pro/regelgeving-en-inspectie/verplichtingen-en-vergunningen/epb-certificaten',
                regions: ['brussels'],
                label: { en: 'EPB certificates (Leefmilieu Brussel)', nl: 'EPB-certificaten (Leefmilieu Brussel)', fr: 'Certificats PEB (Bruxelles Environnement)' },
                note: { en: 'Brussels energy performance rules.', nl: 'Brusselse regels rond energieprestatie.', fr: 'Règles bruxelloises de performance énergétique.' }
            },
            {
                url: 'https://www.energiesparen.be/',
                regions: ['flanders'],
                label: { en: 'Energiesparen.be', nl: 'Energiesparen.be', fr: 'Energiesparen.be' },
                note: { en: 'Flemish energy agency: insulation, heating and ventilation guidance.', nl: 'Vlaams Energieagentschap: isolatie, verwarming en ventilatie.', fr: 'Agence flamande de l\'énergie : isolation, chauffage et ventilation.' }
            },
            {
                url: 'https://apps.energiesparen.be/energiekaart/vlaanderen',
                regions: ['flanders'],
                label: { en: 'Energiekaart - find a certified energy expert', nl: 'Energiekaart - zoek een energiedeskundige', fr: 'Energiekaart - trouver un expert énergie agréé' },
                note: { en: 'Search recognised type A energy experts and contractors.', nl: 'Zoek erkende energiedeskundigen type A en aannemers.', fr: 'Recherchez des experts énergie de type A et des entrepreneurs agréés.' }
            }
        ]
    },
    {
        id: 'permits',
        icon: 'fa-file-signature',
        title: {
            en: 'Permits, planning & heritage',
            nl: 'Vergunningen, ruimtelijke ordening en erfgoed',
            fr: 'Permis, urbanisme et patrimoine'
        },
        intro: {
            en: 'An unpermitted extension becomes your problem the day you sign. Check the file first.',
            nl: 'Een niet-vergunde uitbreiding wordt uw probleem zodra u tekent. Controleer eerst het dossier.',
            fr: 'Une extension sans permis devient votre problème dès la signature. Vérifiez d\'abord le dossier.'
        },
        links: [
            {
                url: 'https://www.vlaanderen.be/omgevingsvergunning',
                regions: ['flanders'],
                label: { en: 'Omgevingsvergunning', nl: 'Omgevingsvergunning', fr: 'Permis d\'environnement (Flandre)' },
                note: { en: 'When you need a permit and how to apply.', nl: 'Wanneer u een vergunning nodig hebt en hoe u ze aanvraagt.', fr: 'Quand un permis est nécessaire et comment l\'introduire.' }
            },
            {
                url: 'https://www.omgevingsloketvlaanderen.be/',
                regions: ['flanders'],
                label: { en: 'Omgevingsloket', nl: 'Omgevingsloket', fr: 'Omgevingsloket' },
                note: { en: 'Consult and submit permit applications online.', nl: 'Vergunningsaanvragen online raadplegen en indienen.', fr: 'Consulter et introduire des demandes de permis en ligne.' }
            },
            {
                url: 'https://www.wallonie.be/fr/demarches/demander-un-permis-durbanisme',
                regions: ['wallonia'],
                label: { en: 'Demander un permis d\'urbanisme', nl: 'Stedenbouwkundige vergunning aanvragen', fr: 'Demander un permis d\'urbanisme' },
                note: { en: 'Walloon planning permit procedure.', nl: 'Waalse procedure voor stedenbouwkundige vergunning.', fr: 'Procédure wallonne de permis d\'urbanisme.' }
            },
            {
                url: 'https://www.onroerenderfgoed.be/',
                regions: ['flanders'],
                label: { en: 'Onroerend Erfgoed', nl: 'Onroerend Erfgoed', fr: 'Patrimoine immobilier (Flandre)' },
                note: { en: 'Protected monuments and townscapes - strict rules, but also subsidies.', nl: 'Beschermde monumenten en stadsgezichten - strenge regels, maar ook premies.', fr: 'Monuments et sites protégés : règles strictes, mais aussi subsides.' }
            },
            {
                url: 'https://inventaris.onroerenderfgoed.be/',
                regions: ['flanders'],
                label: { en: 'Heritage inventory', nl: 'Inventaris Onroerend Erfgoed', fr: 'Inventaire du patrimoine' },
                note: { en: 'Check whether the building is listed or inventoried.', nl: 'Controleer of het gebouw beschermd of geïnventariseerd is.', fr: 'Vérifiez si le bâtiment est classé ou inventorié.' }
            }
        ]
    },
    {
        id: 'safety',
        icon: 'fa-triangle-exclamation',
        title: {
            en: 'Asbestos, soil & safety',
            nl: 'Asbest, bodem en veiligheid',
            fr: 'Amiante, sol et sécurité'
        },
        intro: {
            en: 'These are the risks that can cost more than the house itself.',
            nl: 'Dit zijn de risico\'s die meer kunnen kosten dan het huis zelf.',
            fr: 'Ce sont les risques qui peuvent coûter plus cher que la maison elle-même.'
        },
        links: [
            {
                url: 'https://www.vlaanderen.be/asbestattest',
                regions: ['flanders'],
                label: { en: 'Asbestattest', nl: 'Asbestattest', fr: 'Attestation amiante (Flandre)' },
                note: { en: 'Mandatory at sale for buildings from before 2001.', nl: 'Verplicht bij verkoop voor gebouwen van vóór 2001.', fr: 'Obligatoire à la vente pour les bâtiments antérieurs à 2001.' }
            },
            {
                url: 'https://www.ovam.be/asbest',
                regions: ['flanders'],
                label: { en: 'OVAM - asbestos', nl: 'OVAM - asbest', fr: 'OVAM - amiante' },
                note: { en: 'Where asbestos is found and how it must be removed.', nl: 'Waar asbest voorkomt en hoe het verwijderd moet worden.', fr: 'Où trouver l\'amiante et comment il doit être retiré.' }
            },
            {
                url: 'https://www.asbestinfo.be/',
                label: { en: 'Asbestinfo.be', nl: 'Asbestinfo.be', fr: 'Asbestinfo.be' },
                note: { en: 'Practical information for owners and buyers.', nl: 'Praktische informatie voor eigenaars en kopers.', fr: 'Informations pratiques pour propriétaires et acheteurs.' }
            },
            {
                url: 'https://www.vlaanderen.be/bodemattest',
                regions: ['flanders'],
                label: { en: 'Bodemattest', nl: 'Bodemattest', fr: 'Attestation du sol (Flandre)' },
                note: { en: 'Mandatory before the compromis in Flanders.', nl: 'Verplicht vóór de compromis in Vlaanderen.', fr: 'Obligatoire avant le compromis en Flandre.' }
            },
            {
                url: 'https://www.ovam.be/bodemattest',
                regions: ['flanders'],
                label: { en: 'OVAM - soil certificate', nl: 'OVAM - bodemattest', fr: 'OVAM - attestation du sol' },
                note: { en: 'Request a soil certificate and read the result.', nl: 'Vraag een bodemattest aan en lees het resultaat.', fr: 'Demandez une attestation du sol et interprétez le résultat.' }
            },
            {
                url: 'https://environnement.wallonie.be/home/milieux/sol/bdes/achat-d-un-terrain.html',
                regions: ['wallonia'],
                label: { en: 'BDES - buying a plot', nl: 'BDES - een grond kopen', fr: 'BDES - achat d\'un terrain' },
                note: { en: 'The Walloon soil database extract required before any transfer.', nl: 'Het Waalse bodemdatabank-uittreksel dat vóór elke overdracht vereist is.', fr: 'L\'extrait de la banque de données des sols requis avant toute cession.' }
            },
            {
                url: 'https://environnement.wallonie.be/home/milieux/sol/citernes.html',
                regions: ['wallonia'],
                label: { en: 'Heating oil tanks (Wallonia)', nl: 'Stookolietanks (Wallonië)', fr: 'Citernes à mazout (Wallonie)' },
                note: { en: 'Periodic controls and maintenance obligations.', nl: 'Verplichtingen rond periodieke controle en onderhoud.', fr: 'Obligations de contrôle périodique et d\'entretien.' }
            },
            {
                url: 'https://www.vlaanderen.be/bouwen-wonen-en-energie/veilig-gezond-en-kwaliteitsvol-wonen/woningkwaliteitsnormen/rookmelders',
                regions: ['flanders'],
                label: { en: 'Smoke detectors (Flanders)', nl: 'Rookmelders (Vlaanderen)', fr: 'Détecteurs de fumée (Flandre)' },
                note: { en: 'Mandatory in every home since 1 January 2020.', nl: 'Verplicht in elke woning sinds 1 januari 2020.', fr: 'Obligatoires dans chaque logement depuis le 1er janvier 2020.' }
            },
            {
                url: 'https://www.wallonie.be/fr/demarches/installer-un-detecteur-de-fumee-dans-son-logement',
                regions: ['wallonia'],
                label: { en: 'Smoke detectors (Wallonia)', nl: 'Rookmelders (Wallonië)', fr: 'Détecteurs de fumée (Wallonie)' },
                note: { en: 'Walloon rules on installing smoke detectors.', nl: 'Waalse regels voor het plaatsen van rookmelders.', fr: 'Règles wallonnes d\'installation des détecteurs de fumée.' }
            },
            {
                url: 'https://economie.fgov.be/nl/themas/energie/bronnen-en-dragers-van-energie/elektriciteit/veiligheid-en-controle-van/controle-van-huishoudelijke',
                label: { en: 'Electrical inspection of homes (FPS Economy)', nl: 'Controle van huishoudelijke installaties (FOD Economie)', fr: 'Contrôle des installations domestiques (SPF Économie)' },
                note: { en: 'Federal rule: valid 25 years, 18 months to correct after purchase.', nl: 'Federale regel: 25 jaar geldig, 18 maanden om na aankoop in orde te brengen.', fr: 'Règle fédérale : valable 25 ans, 18 mois pour se mettre en ordre après l\'achat.' }
            }
        ]
    },
    {
        id: 'money',
        icon: 'fa-euro-sign',
        title: {
            en: 'Money, taxes, premiums & insurance',
            nl: 'Geld, belastingen, premies en verzekering',
            fr: 'Argent, taxes, primes et assurance'
        },
        intro: {
            en: 'Budget the taxes and grab the free protection - most buyers miss at least one of these.',
            nl: 'Begroot de belastingen en pak de gratis bescherming - de meeste kopers missen er minstens één.',
            fr: 'Budgétez les taxes et saisissez la protection gratuite - la plupart des acheteurs en manquent au moins une.'
        },
        links: [
            {
                url: 'https://www.vlaanderen.be/verzekering-gewaarborgd-wonen',
                regions: ['flanders'],
                label: { en: 'Verzekering Gewaarborgd Wonen - FREE income protection', nl: 'Verzekering gewaarborgd wonen - GRATIS inkomensbescherming', fr: 'Assurance logement garanti - protection GRATUITE' },
                note: { en: 'Apply within 1 year of the first drawdown of your mortgage. Costs nothing.', nl: 'Aanvragen binnen 1 jaar na de eerste kapitaalsopname. Kost niets.', fr: 'À demander dans l\'année suivant le premier prélèvement. Gratuit.' }
            },
            {
                url: 'https://www.vlaanderen.be/en/guaranteed-housing-insurance-for-mortgages',
                regions: ['flanders'],
                label: { en: 'Guaranteed Housing Insurance (English)', nl: 'Guaranteed Housing Insurance (Engels)', fr: 'Guaranteed Housing Insurance (anglais)' },
                note: { en: 'Same scheme, English explanation.', nl: 'Zelfde regeling, Engelse uitleg.', fr: 'Même dispositif, explication en anglais.' }
            },
            {
                url: 'https://www.vlaanderen.be/fr/assurance-logement-garanti',
                regions: ['flanders'],
                label: { en: 'Assurance logement garanti (French)', nl: 'Assurance logement garanti (Frans)', fr: 'Assurance logement garanti (français)' },
                note: { en: 'Same scheme, French explanation.', nl: 'Zelfde regeling, Franse uitleg.', fr: 'Même dispositif, explication en français.' }
            },
            {
                url: 'https://www.vlaanderen.be/belastingen-en-begroting/vlaamse-belastingen/registratiebelasting/verkooprecht/tarieven-in-het-verkooprecht/het-verkooprecht-bij-de-aankoop-van-de-enige-eigen-woning-overzicht',
                regions: ['flanders'],
                label: { en: 'Registration duty - sole and own home', nl: 'Verkooprecht - enige eigen woning', fr: 'Droits d\'enregistrement - habitation propre et unique' },
                note: { en: '2% since 1 January 2025, subject to conditions.', nl: '2% sinds 1 januari 2025, onder voorwaarden.', fr: '2 % depuis le 1er janvier 2025, sous conditions.' }
            },
            {
                url: 'https://www.vlaanderen.be/belastingen-en-begroting/vlaamse-belastingen/registratiebelasting/verkooprecht/tarieven-in-het-verkooprecht/algemeen-tarief-in-het-verkooprecht',
                regions: ['flanders'],
                label: { en: 'Registration duty - general rate', nl: 'Verkooprecht - algemeen tarief', fr: 'Droits d\'enregistrement - taux général' },
                note: { en: '12% for anything that is not your sole and own home.', nl: '12% voor alles wat niet uw enige eigen woning is.', fr: '12 % pour tout ce qui n\'est pas votre habitation propre et unique.' }
            },
            {
                url: 'https://www.notaire.be/immobilier/acheter-et-vendre-un-bien-immobilier/les-frais-lies-lachat/droits-denregistrement-en-region-wallonne',
                regions: ['wallonia'],
                label: { en: 'Registration duty in Wallonia (Notaire.be)', nl: 'Registratierechten in Wallonië (Notaire.be)', fr: 'Droits d\'enregistrement en Wallonie (Notaire.be)' },
                note: { en: 'Have your notary confirm the exact rate in writing.', nl: 'Laat uw notaris het exacte tarief schriftelijk bevestigen.', fr: 'Faites confirmer le taux exact par écrit par votre notaire.' }
            },
            {
                url: 'https://be.brussels/fr/impots-financement/impots-et-taxes/fiscalite-immobiliere/droits-denregistrement/abattement-sur-les-droits-de-vente',
                regions: ['brussels'],
                label: { en: 'Brussels abattement on registration duty', nl: 'Brussels abattement op registratierechten', fr: 'Abattement bruxellois sur les droits de vente' },
                note: { en: 'Abattement on the first 200,000 EUR for your sole home.', nl: 'Abattement op de eerste 200.000 EUR voor uw enige woning.', fr: 'Abattement sur les premiers 200 000 EUR pour votre habitation unique.' }
            },
            {
                url: 'https://www.mijnverbouwpremie.be/',
                regions: ['flanders'],
                label: { en: 'Mijn VerbouwPremie', nl: 'Mijn VerbouwPremie', fr: 'Mijn VerbouwPremie' },
                note: { en: 'Flemish renovation and energy premiums in one application.', nl: 'Vlaamse renovatie- en energiepremies in één aanvraag.', fr: 'Primes flamandes de rénovation et d\'énergie en une seule demande.' }
            },
            {
                url: 'https://www.vlaanderen.be/mijn-verbouwlening',
                regions: ['flanders'],
                label: { en: 'Mijn VerbouwLening', nl: 'Mijn VerbouwLening', fr: 'Mijn VerbouwLening' },
                note: { en: 'Low-interest renovation loan for eligible owners.', nl: 'Renovatielening tegen lage rente voor wie in aanmerking komt.', fr: 'Prêt rénovation à taux réduit pour les propriétaires éligibles.' }
            },
            {
                url: 'https://www.vlaanderen.be/premies-voor-renovatie',
                regions: ['flanders'],
                label: { en: 'Renovation support overview', nl: 'Overzicht renovatiepremies', fr: 'Aperçu des aides à la rénovation' },
                note: { en: 'All Flemish renovation support in one overview.', nl: 'Alle Vlaamse renovatiesteun in één overzicht.', fr: 'Toutes les aides flamandes à la rénovation en un aperçu.' }
            },
            {
                url: 'https://logement.wallonie.be/',
                regions: ['wallonia'],
                label: { en: 'Logement Wallonie', nl: 'Logement Wallonie', fr: 'Logement Wallonie' },
                note: { en: 'Walloon housing aid, loans and renovation grants.', nl: 'Waalse woonsteun, leningen en renovatiepremies.', fr: 'Aides au logement, prêts et primes de rénovation en Wallonie.' }
            },
            {
                url: 'https://logement.brussels/',
                regions: ['brussels'],
                label: { en: 'Logement Bruxelles', nl: 'Logement Brussel', fr: 'Logement Bruxelles' },
                note: { en: 'Brussels housing information and support.', nl: 'Brusselse woninformatie en ondersteuning.', fr: 'Informations et aides au logement à Bruxelles.' }
            },
            {
                url: 'https://statbel.fgov.be/nl/themas/bouwen-wonen/vastgoedprijzen',
                label: { en: 'Statbel - real estate prices', nl: 'Statbel - vastgoedprijzen', fr: 'Statbel - prix de l\'immobilier' },
                note: { en: 'Official median prices per municipality - check if the asking price is realistic.', nl: 'Officiële mediaanprijzen per gemeente - check of de vraagprijs realistisch is.', fr: 'Prix médians officiels par commune - vérifiez si le prix demandé est réaliste.' }
            }
        ]
    },
    {
        id: 'quality',
        icon: 'fa-clipboard-check',
        title: {
            en: 'Housing quality, utilities & expert advice',
            nl: 'Woningkwaliteit, nutsvoorzieningen en deskundig advies',
            fr: 'Qualité du logement, utilités et conseils d\'experts'
        },
        intro: {
            en: 'Standards, connections and independent technical guidance.',
            nl: 'Normen, aansluitingen en onafhankelijke technische begeleiding.',
            fr: 'Normes, raccordements et conseils techniques indépendants.'
        },
        links: [
            {
                url: 'https://www.vlaanderen.be/woningkwaliteit',
                regions: ['flanders'],
                label: { en: 'Housing quality (Flanders)', nl: 'Woningkwaliteit (Vlaanderen)', fr: 'Qualité du logement (Flandre)' },
                note: { en: 'The minimum quality standards a home must meet.', nl: 'De minimale kwaliteitsnormen waaraan een woning moet voldoen.', fr: 'Les normes minimales de qualité qu\'un logement doit respecter.' }
            },
            {
                url: 'https://www.vlaanderen.be/woningkwaliteitsnormen',
                regions: ['flanders'],
                label: { en: 'Housing quality standards in detail', nl: 'Woningkwaliteitsnormen in detail', fr: 'Normes de qualité du logement en détail' },
                note: { en: 'Detailed norms for safety, health and habitability.', nl: 'Gedetailleerde normen voor veiligheid, gezondheid en bewoonbaarheid.', fr: 'Normes détaillées de sécurité, salubrité et habitabilité.' }
            },
            {
                url: 'https://homegrade.brussels/',
                regions: ['brussels'],
                label: { en: 'Homegrade', nl: 'Homegrade', fr: 'Homegrade' },
                note: { en: 'Free advice on housing, renovation and energy in Brussels.', nl: 'Gratis advies over wonen, renovatie en energie in Brussel.', fr: 'Conseils gratuits sur le logement, la rénovation et l\'énergie à Bruxelles.' }
            },
            {
                url: 'https://www.fluvius.be/',
                regions: ['flanders'],
                label: { en: 'Fluvius', nl: 'Fluvius', fr: 'Fluvius' },
                note: { en: 'Meters, connections, capacity and grid questions in Flanders.', nl: 'Meters, aansluitingen, capaciteit en netvragen in Vlaanderen.', fr: 'Compteurs, raccordements, capacité et questions réseau en Flandre.' }
            },
            {
                url: 'https://www.buildwise.be/',
                label: { en: 'Buildwise (formerly WTCB/CSTC)', nl: 'Buildwise (voorheen WTCB)', fr: 'Buildwise (anciennement CSTC)' },
                note: { en: 'Belgian building research institute - authoritative technical guidance.', nl: 'Belgisch onderzoeksinstituut voor de bouw - gezaghebbende technische richtlijnen.', fr: 'Centre de recherche belge du bâtiment - références techniques faisant autorité.' }
            },
            {
                url: 'https://www.abex.be/',
                label: { en: 'ABEX construction cost index', nl: 'ABEX-index voor bouwkosten', fr: 'Indice ABEX du coût de la construction' },
                note: { en: 'Used in insurance and valuations.', nl: 'Gebruikt in verzekeringen en waarderingen.', fr: 'Utilisé en assurance et en évaluation.' }
            },
            {
                url: 'https://www.notaris.be/',
                label: { en: 'Notaris.be / Notaire.be', nl: 'Notaris.be', fr: 'Notaire.be' },
                note: { en: 'Deeds, compromis, costs and your legal rights as a buyer.', nl: 'Akten, compromis, kosten en uw rechten als koper.', fr: 'Actes, compromis, frais et vos droits en tant qu\'acheteur.' }
            },
            {
                url: 'https://www.test-aankoop.be/',
                label: { en: 'Test Aankoop / Test Achats', nl: 'Test Aankoop', fr: 'Test Achats' },
                note: { en: 'Independent consumer organisation with housing dossiers.', nl: 'Onafhankelijke consumentenorganisatie met woondossiers.', fr: 'Organisation de consommateurs indépendante avec des dossiers logement.' }
            },
            {
                url: 'https://www.bouwunie.be/',
                label: { en: 'Bouwunie - find a contractor', nl: 'Bouwunie - vind een aannemer', fr: 'Bouwunie - trouver un entrepreneur' },
                note: { en: 'Find recognised contractors for quotes and repairs.', nl: 'Vind erkende aannemers voor offertes en herstellingen.', fr: 'Trouvez des entrepreneurs reconnus pour devis et réparations.' }
            }
        ]
    },
    {
        id: 'search',
        icon: 'fa-magnifying-glass',
        title: {
            en: 'Finding a property',
            nl: 'Een woning zoeken',
            fr: 'Trouver un bien'
        },
        intro: {
            en: 'Where Belgian properties are advertised. Always verify the listing data against the official sources above.',
            nl: 'Waar Belgische panden geadverteerd worden. Controleer advertentiegegevens altijd tegen de officiële bronnen hierboven.',
            fr: 'Où les biens belges sont annoncés. Vérifiez toujours les données de l\'annonce avec les sources officielles ci-dessus.'
        },
        links: [
            {
                url: 'https://www.immoweb.be/',
                label: { en: 'Immoweb', nl: 'Immoweb', fr: 'Immoweb' },
                note: { en: 'Largest Belgian property portal.', nl: 'Grootste Belgische vastgoedportaal.', fr: 'Plus grand portail immobilier belge.' }
            },
            {
                url: 'https://www.immovlan.be/',
                label: { en: 'Immovlan', nl: 'Immovlan', fr: 'Immovlan' },
                note: { en: 'Portal backed by Belgian media groups.', nl: 'Portaal gesteund door Belgische mediagroepen.', fr: 'Portail soutenu par des groupes de médias belges.' }
            }
        ]
    }
];

/* ---------------------------------------------------------------------
 * Address lookup tools (lookup.html)
 * ---------------------------------------------------------------------
 * One entry per official viewer or registry a buyer should check for a
 * specific address. `auto: true` means the address can be appended to
 * `url` (already URL-encoded by the page); otherwise the tool has no
 * address parameter and the user pastes the address in its own search
 * box - that is what the copy button on the page is for.
 * `query: 'street'` strips house number and postal code first (used
 * where a full address returns nothing, e.g. the heritage inventory).
 * ------------------------------------------------------------------- */
const LOOKUP_TOOLS = [

    /* ---- Maps ---- */
    {
        id: 'gmaps',
        group: 'maps',
        icon: 'fa-map-location-dot',
        regions: ['flanders', 'wallonia', 'brussels'],
        auto: true,
        url: 'https://www.google.com/maps/search/?api=1&query=',
        label: { en: 'Google Maps', nl: 'Google Maps', fr: 'Google Maps' },
        note: {
            en: 'Aerial view, Street View and the surroundings. Walk the street virtually before you drive there.',
            nl: 'Luchtfoto, Street View en de omgeving. Wandel virtueel door de straat vóór u erheen rijdt.',
            fr: 'Vue aérienne, Street View et les environs. Parcourez la rue virtuellement avant de vous déplacer.'
        }
    },
    {
        id: 'osm',
        group: 'maps',
        icon: 'fa-map',
        regions: ['flanders', 'wallonia', 'brussels'],
        auto: true,
        url: 'https://www.openstreetmap.org/search?query=',
        label: { en: 'OpenStreetMap', nl: 'OpenStreetMap', fr: 'OpenStreetMap' },
        note: {
            en: 'Community map that often shows footpaths, land use and building outlines Google omits.',
            nl: 'Gemeenschapskaart die vaak voetwegen, landgebruik en gebouwcontouren toont die Google weglaat.',
            fr: 'Carte communautaire montrant souvent sentiers, usage du sol et contours de bâtiments absents de Google.'
        }
    },

    /* ---- Parcel & ownership ---- */
    {
        id: 'cadgis',
        group: 'property',
        icon: 'fa-border-all',
        regions: ['flanders', 'wallonia', 'brussels'],
        auto: false,
        url: 'https://eservices.minfin.fgov.be/ecad-web/#/',
        label: { en: 'CadGIS - federal cadastre', nl: 'CadGIS - federaal kadaster', fr: 'CadGIS - cadastre fédéral' },
        note: {
            en: 'Official parcel boundaries and cadastral plan. Check that the garden you are shown is actually part of the parcel.',
            nl: 'Officiële perceelsgrenzen en kadastraal plan. Controleer of de tuin die men u toont echt bij het perceel hoort.',
            fr: 'Limites parcellaires officielles et plan cadastral. Vérifiez que le jardin qu\'on vous montre appartient bien à la parcelle.'
        }
    },
    {
        id: 'myminfin',
        group: 'property',
        icon: 'fa-file-signature',
        regions: ['flanders', 'wallonia', 'brussels'],
        auto: false,
        url: 'https://eservices.minfin.fgov.be/myminfin-web/',
        label: { en: 'MyMinfin', nl: 'MyMinfin', fr: 'MyMinfin' },
        note: {
            en: 'Request a cadastral extract and consult registered deeds (login with itsme or eID).',
            nl: 'Vraag een kadastraal uittreksel op en raadpleeg geregistreerde akten (aanmelden met itsme of eID).',
            fr: 'Demandez un extrait cadastral et consultez les actes enregistrés (connexion itsme ou eID).'
        }
    },

    /* ---- Water & flood ---- */
    {
        id: 'waterinfo',
        group: 'water',
        icon: 'fa-house-flood-water',
        regions: ['flanders'],
        auto: false,
        url: 'https://www.waterinfo.be/kaarten',
        label: { en: 'Waterinfo.be flood maps', nl: 'Waterinfo.be overstromingskaarten', fr: 'Cartes d\'inondation Waterinfo.be' },
        note: {
            en: 'The official Flemish flood maps behind the P-score and G-score the seller must disclose.',
            nl: 'De officiële Vlaamse overstromingskaarten achter de P-score en G-score die de verkoper moet meedelen.',
            fr: 'Les cartes officielles flamandes derrière les scores P et G que le vendeur doit communiquer.'
        }
    },
    {
        id: 'bruflood',
        group: 'water',
        icon: 'fa-house-flood-water',
        regions: ['brussels'],
        auto: false,
        url: 'https://environnement.brussels/citoyen/documentation-et-outils/cartes/cartes-relatives-aux-inondations-pour-la-region-bruxelloise',
        label: { en: 'Brussels flood maps', nl: 'Brusselse overstromingskaarten', fr: 'Cartes d\'inondation bruxelloises' },
        note: {
            en: 'Flood-hazard and runoff maps for the Brussels-Capital Region.',
            nl: 'Kaarten met overstromingsgevaar en afstroming voor het Brussels Hoofdstedelijk Gewest.',
            fr: 'Cartes d\'aléa d\'inondation et de ruissellement pour la Région de Bruxelles-Capitale.'
        }
    },

    /* ---- Soil & subsoil ---- */
    {
        id: 'dov',
        group: 'soil',
        icon: 'fa-layer-group',
        regions: ['flanders'],
        auto: false,
        url: 'https://www.dov.vlaanderen.be/',
        label: { en: 'DOV - Flemish subsoil database', nl: 'DOV - Databank Ondergrond Vlaanderen', fr: 'DOV - base de données du sous-sol flamand' },
        note: {
            en: 'Subsoil viewer with the swelling-clay map (plastische gronden), groundwater levels and virtual borings - the drought-crack risk check.',
            nl: 'Ondergrondverkenner met de kaart plastische gronden, grondwaterstanden en virtuele boringen - dé controle op droogtescheurrisico.',
            fr: 'Visionneuse du sous-sol avec la carte des argiles gonflantes, les nappes et les forages virtuels - le contrôle du risque de fissures de sécheresse.'
        }
    },
    {
        id: 'bdes',
        group: 'soil',
        icon: 'fa-flask-vial',
        regions: ['wallonia'],
        auto: false,
        url: 'https://bdes.wallonie.be/',
        label: { en: 'BDES - Walloon soil-state database', nl: 'BDES - Waalse bodemdatabank', fr: 'BDES - Banque de données de l\'état des sols' },
        note: {
            en: 'Whether the parcel is listed as polluted or potentially polluted, and what obligations follow.',
            nl: 'Of het perceel als verontreinigd of mogelijk verontreinigd geregistreerd staat, en welke verplichtingen daaruit volgen.',
            fr: 'Si la parcelle est reprise comme polluée ou potentiellement polluée, et les obligations qui en découlent.'
        }
    },
    {
        id: 'brusoil',
        group: 'soil',
        icon: 'fa-flask-vial',
        regions: ['brussels'],
        auto: false,
        url: 'https://environnement.brussels/citoyen/agir-pour-lenvironnement/renover-et-construire/votre-sol-est-il-pollue-consultez-la-carte-de-linventaire-de-letat-du-sol',
        label: { en: 'Brussels soil-state inventory', nl: 'Brusselse inventaris van de bodemtoestand', fr: 'Inventaire de l\'état du sol bruxellois' },
        note: {
            en: 'The soil-state map and the Brusoil platform: pollution category of the parcel and soil certificates.',
            nl: 'De bodemtoestandskaart en het Brusoil-platform: verontreinigingscategorie van het perceel en bodemattesten.',
            fr: 'La carte de l\'état du sol et la plateforme Brusoil : catégorie de pollution de la parcelle et attestations du sol.'
        }
    },

    /* ---- Zoning, permits & heritage ---- */
    {
        id: 'geopunt',
        group: 'planning',
        icon: 'fa-map-pin',
        regions: ['flanders'],
        auto: false,
        url: 'https://www.geopunt.be/',
        label: { en: 'Geopunt Vlaanderen', nl: 'Geopunt Vlaanderen', fr: 'Geopunt Flandre' },
        note: {
            en: 'The Flemish geoportal: zoning plans, aerial photos through the years, sewer zoning and dozens of other layers.',
            nl: 'Het Vlaamse geoportaal: bestemmingsplannen, luchtfoto\'s door de jaren heen, rioleringszonering en tientallen andere lagen.',
            fr: 'Le géoportail flamand : plans d\'affectation, photos aériennes au fil des ans, zonage d\'égouttage et des dizaines d\'autres couches.'
        }
    },
    {
        id: 'omgevingsloket',
        group: 'planning',
        icon: 'fa-file-circle-check',
        regions: ['flanders'],
        auto: false,
        url: 'https://omgevingsloketpubliek.omgeving.vlaanderen.be/',
        label: { en: 'Omgevingsloket - public permit viewer', nl: 'Omgevingsloket - publieke vergunningen', fr: 'Omgevingsloket - permis publics' },
        note: {
            en: 'Permits granted and pending around the address - see what the neighbours are about to build.',
            nl: 'Afgeleverde en lopende vergunningen rond het adres - zie wat de buren van plan zijn te bouwen.',
            fr: 'Permis délivrés et en cours autour de l\'adresse - voyez ce que les voisins s\'apprêtent à construire.'
        }
    },
    {
        id: 'erfgoed',
        group: 'planning',
        icon: 'fa-landmark',
        regions: ['flanders'],
        auto: true,
        query: 'street',
        url: 'https://inventaris.onroerenderfgoed.be/erfgoedobjecten?tekst=',
        label: { en: 'Heritage inventory', nl: 'Inventaris onroerend erfgoed', fr: 'Inventaire du patrimoine immobilier' },
        note: {
            en: 'Searches the street for listed or inventoried buildings - protection limits what you may renovate.',
            nl: 'Doorzoekt de straat op beschermde of geïnventariseerde gebouwen - bescherming beperkt wat u mag verbouwen.',
            fr: 'Recherche dans la rue les bâtiments classés ou inventoriés - une protection limite ce que vous pouvez rénover.'
        }
    },
    {
        id: 'walonmap',
        group: 'planning',
        icon: 'fa-map-pin',
        regions: ['wallonia'],
        auto: false,
        url: 'https://geoportail.wallonie.be/walonmap',
        label: { en: 'WalOnMap', nl: 'WalOnMap', fr: 'WalOnMap' },
        note: {
            en: 'The Walloon geoportal: zoning (plan de secteur), flood hazard (aléa d\'inondation), aerial photos and heritage layers.',
            nl: 'Het Waalse geoportaal: bestemming (plan de secteur), overstromingsgevaar (aléa d\'inondation), luchtfoto\'s en erfgoedlagen.',
            fr: 'Le géoportail wallon : plan de secteur, aléa d\'inondation, photos aériennes et couches patrimoine.'
        }
    },
    {
        id: 'brugis',
        group: 'planning',
        icon: 'fa-map-pin',
        regions: ['brussels'],
        auto: false,
        url: 'https://mybrugis.irisnet.be/',
        label: { en: 'BruGIS', nl: 'BruGIS', fr: 'BruGIS' },
        note: {
            en: 'The Brussels geoportal: PRAS zoning, permits, heritage and aerial photos.',
            nl: 'Het Brusselse geoportaal: GBP-bestemming, vergunningen, erfgoed en luchtfoto\'s.',
            fr: 'Le géoportail bruxellois : affectation PRAS, permis, patrimoine et photos aériennes.'
        }
    },

    /* ---- Environment ---- */
    {
        id: 'irceline',
        group: 'environment',
        icon: 'fa-wind',
        regions: ['flanders', 'wallonia', 'brussels'],
        auto: false,
        url: 'https://www.irceline.be/nl',
        label: { en: 'IRCEL-CELINE air quality', nl: 'IRCEL-CELINE luchtkwaliteit', fr: 'Qualité de l\'air IRCEL-CELINE' },
        note: {
            en: 'Official Belgian air-quality maps down to street level - worth a look next to a busy road.',
            nl: 'Officiële Belgische luchtkwaliteitskaarten tot op straatniveau - het bekijken waard bij een drukke weg.',
            fr: 'Cartes officielles belges de la qualité de l\'air jusqu\'au niveau de la rue - utile près d\'un axe fréquenté.'
        }
    }
];
