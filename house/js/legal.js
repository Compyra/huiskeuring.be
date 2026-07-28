/* =====================================================================
 * huiskeuring.be - LEGAL FACTS & DEADLINES
 * =====================================================================
 *
 *  >>> THIS IS THE FILE THAT MUST BE RE-CHECKED EVERY 6 MONTHS. <<<
 *
 * Nothing else in the project encodes a legal rule, a deadline, a tax rate
 * or an amount of money. If a Belgian rule changes, it changes HERE.
 *
 * How to do a review
 * ------------------
 *  1. Open every URL in `sources` of every topic and confirm it still loads.
 *  2. Confirm the deadline / interval / amount still matches the page.
 *  3. Update `lastVerified` on the region block you checked (ISO date).
 *  4. Update LEGAL_META.lastFullReview and LEGAL_META.nextReviewDue.
 *  5. If a region could not be verified, set status to 'unverified' - the UI
 *     then shows an honest "not verified for this region" warning instead of
 *     presenting a guess as a fact.
 *
 * status values
 * -------------
 *  'verified'       - checked against the official source on `lastVerified`
 *  'unverified'     - could not be confirmed on an official source; the UI
 *                     tells the user to check the regional portal
 *  'not-applicable' - the obligation genuinely does not exist in that region
 *
 * Regions: 'flanders' | 'wallonia' | 'brussels' | 'federal'
 * ===================================================================== */

const LEGAL_META = {
    lastFullReview: '2026-07-28',
    reviewIntervalMonths: 6,
    nextReviewDue: '2027-01-28',
    /* Bump when the legal content itself changes, so the freshness banner
       can tell users that something was updated. */
    contentVersion: '2026.07b'
};

const REGIONS = [
    { id: 'flanders', label: { en: 'Flanders', nl: 'Vlaanderen', fr: 'Flandre' }, portal: 'https://www.vlaanderen.be/' },
    { id: 'wallonia', label: { en: 'Wallonia', nl: 'Wallonië', fr: 'Wallonie' }, portal: 'https://www.wallonie.be/fr' },
    { id: 'brussels', label: { en: 'Brussels', nl: 'Brussel', fr: 'Bruxelles' }, portal: 'https://environnement.brussels/' }
];

/* Postal code ranges -> region, used to pre-select the region from the address. */
const POSTAL_REGIONS = [
    { from: 1000, to: 1299, region: 'brussels' },
    { from: 1300, to: 1499, region: 'wallonia' },   // Waals-Brabant / Brabant wallon
    { from: 1500, to: 1999, region: 'flanders' },   // Vlaams-Brabant
    { from: 2000, to: 2999, region: 'flanders' },   // Antwerpen
    { from: 3000, to: 3499, region: 'flanders' },   // Vlaams-Brabant / Limburg
    { from: 3500, to: 3999, region: 'flanders' },   // Limburg
    { from: 4000, to: 4999, region: 'wallonia' },   // Liège
    { from: 5000, to: 5999, region: 'wallonia' },   // Namur
    { from: 6000, to: 6599, region: 'wallonia' },   // Hainaut (Charleroi)
    { from: 6600, to: 6999, region: 'wallonia' },   // Luxembourg
    { from: 7000, to: 7999, region: 'wallonia' },   // Hainaut
    { from: 8000, to: 8999, region: 'flanders' },   // West-Vlaanderen
    { from: 9000, to: 9999, region: 'flanders' }    // Oost-Vlaanderen
];

function regionFromPostalCode(input) {
    const match = String(input || '').match(/\b(\d{4})\b/);
    if (!match) return null;
    const code = parseInt(match[1], 10);
    const hit = POSTAL_REGIONS.find(r => code >= r.from && code <= r.to);
    return hit ? hit.region : null;
}

/* ---------------------------------------------------------------------
 * Reminder definitions
 * ---------------------------------------------------------------------
 * anchor:  'deed'      - the date of the notarial deed
 *          'drawdown'  - first drawdown of the mortgage
 *          'today'     - the date the user generates the reminder
 * offsetMonths: how long after the anchor the deadline falls
 * leadDays: how many days before the deadline the calendar alarm fires
 * ------------------------------------------------------------------- */
const LEGAL_REMINDERS = [
    {
        id: 'insurance-application',
        topic: 'insurance',
        regions: ['flanders'],
        anchor: 'drawdown',
        offsetMonths: 12,
        leadDays: 60,
        title: {
            en: 'Last chance: apply for the free Verzekering Gewaarborgd Wonen',
            nl: 'Laatste kans: vraag de gratis verzekering gewaarborgd wonen aan',
            fr: 'Dernière chance : demandez l\'assurance logement garanti gratuite'
        },
        body: {
            en: 'The application must reach the Vlaams Woningfonds within one year of the first drawdown of your mortgage. It is free and it covers your instalments for up to 3 years if you lose your income. After this date you can no longer apply for this loan.',
            nl: 'De aanvraag moet binnen het jaar na de eerste kapitaalsopname bij het Vlaams Woningfonds zijn. Ze is gratis en dekt tot 3 jaar lang uw aflossingen als u uw inkomen verliest. Na deze datum kunt u voor deze lening niet meer aanvragen.',
            fr: 'La demande doit parvenir au Vlaams Woningfonds dans l\'année qui suit le premier prélèvement du crédit. Elle est gratuite et couvre vos mensualités jusqu\'à 3 ans en cas de perte de revenus. Passé cette date, la demande n\'est plus possible pour ce crédit.'
        }
    },
    {
        id: 'electrical-conformity',
        topic: 'electrical',
        regions: ['flanders', 'wallonia', 'brussels'],
        anchor: 'deed',
        offsetMonths: 18,
        leadDays: 90,
        title: {
            en: 'Deadline: electrical installation must be compliant and re-inspected',
            nl: 'Deadline: elektrische installatie moet conform zijn en herkeurd',
            fr: 'Échéance : l\'installation électrique doit être conforme et recontrôlée'
        },
        body: {
            en: 'If the inspection report at purchase said "non-compliant", you have 18 months from the deed to have the infractions corrected and the installation re-inspected by a recognised body.',
            nl: 'Als het keuringsverslag bij aankoop "niet conform" was, hebt u 18 maanden vanaf de akte om de inbreuken te laten wegwerken en de installatie opnieuw te laten keuren door een erkend organisme.',
            fr: 'Si le rapport de contrôle à l\'achat indiquait « non conforme », vous avez 18 mois à partir de l\'acte pour faire corriger les infractions et faire recontrôler l\'installation par un organisme agréé.'
        }
    },
    {
        id: 'epc-renovation',
        topic: 'epc',
        regions: ['flanders'],
        anchor: 'deed',
        offsetMonths: 72,
        leadDays: 365,
        title: {
            en: 'Deadline: renovation obligation - the home must reach EPC label D',
            nl: 'Deadline: renovatieverplichting - de woning moet EPC-label D halen',
            fr: 'Échéance : obligation de rénovation - le logement doit atteindre le label D'
        },
        body: {
            en: 'A Flemish home bought with EPC label E or F must reach at least label D within 6 years of the notarial deed, proven with a new EPC. Start planning at least two years ahead - contractors and premium applications take time.',
            nl: 'Een Vlaamse woning gekocht met EPC-label E of F moet binnen 6 jaar na de notariële akte minstens label D halen, bewezen met een nieuw EPC. Begin minstens twee jaar op voorhand te plannen - aannemers en premieaanvragen kosten tijd.',
            fr: 'Un logement flamand acheté avec un label PEB E ou F doit atteindre au moins le label D dans les 6 ans suivant l\'acte notarié, prouvé par un nouveau PEB. Planifiez au moins deux ans à l\'avance : entrepreneurs et primes prennent du temps.'
        }
    },
    {
        id: 'heating-service-gas',
        topic: 'heating',
        regions: ['flanders'],
        anchor: 'today',
        offsetMonths: 24,
        leadDays: 30,
        title: {
            en: 'Service due: gas heating appliance (every 2 years in Flanders)',
            nl: 'Onderhoud vervalt: gasverwarming (elke 2 jaar in Vlaanderen)',
            fr: 'Entretien à prévoir : chauffage au gaz (tous les 2 ans en Flandre)'
        },
        body: {
            en: 'Book a recognised technician and keep the maintenance certificate. Missing certificates can be used by an insurer to reduce a payout after a fire or a carbon monoxide incident.',
            nl: 'Boek een erkend technicus en bewaar het onderhoudsattest. Ontbrekende attesten kunnen door een verzekeraar gebruikt worden om een uitkering te verminderen na brand of een CO-incident.',
            fr: 'Prenez rendez-vous avec un technicien agréé et conservez l\'attestation d\'entretien. Une attestation manquante peut être invoquée par l\'assureur pour réduire une indemnisation après un incendie ou une intoxication au CO.'
        }
    },
    {
        id: 'heating-service-oil',
        topic: 'heating',
        regions: ['flanders'],
        anchor: 'today',
        offsetMonths: 12,
        leadDays: 30,
        title: {
            en: 'Service due: liquid-fuel (mazout) heating appliance (yearly in Flanders)',
            nl: 'Onderhoud vervalt: mazoutverwarming (jaarlijks in Vlaanderen)',
            fr: 'Entretien à prévoir : chauffage au mazout (annuel en Flandre)'
        },
        body: {
            en: 'Liquid-fuel appliances must be serviced every year in Flanders. Keep the certificate with the property file.',
            nl: 'Mazoutketels moeten in Vlaanderen jaarlijks onderhouden worden. Bewaar het attest bij het woningdossier.',
            fr: 'Les appareils au mazout doivent être entretenus chaque année en Flandre. Conservez l\'attestation dans le dossier du bien.'
        }
    },
    {
        id: 'smoke-detector-life',
        topic: 'smokedetector',
        regions: ['flanders', 'wallonia', 'brussels'],
        anchor: 'today',
        offsetMonths: 120,
        leadDays: 30,
        title: {
            en: 'Replace the smoke detectors (typical 10-year lifetime)',
            nl: 'Vervang de rookmelders (typische levensduur 10 jaar)',
            fr: 'Remplacez les détecteurs de fumée (durée de vie typique de 10 ans)'
        },
        body: {
            en: 'Optical smoke detectors expire. The date is printed on the housing; an expired detector legally counts as no detector. Test every detector monthly.',
            nl: 'Optische rookmelders vervallen. De datum staat op de behuizing; een vervallen melder telt wettelijk als geen melder. Test elke melder maandelijks.',
            fr: 'Les détecteurs optiques expirent. La date figure sur le boîtier ; un détecteur périmé équivaut légalement à une absence de détecteur. Testez chaque détecteur tous les mois.'
        }
    },
    {
        id: 'asbestos-certificate-validity',
        topic: 'asbestos',
        regions: ['flanders'],
        anchor: 'today',
        offsetMonths: 120,
        leadDays: 90,
        title: {
            en: 'Asbestos certificate expires (maximum 10 years)',
            nl: 'Asbestattest vervalt (maximaal 10 jaar)',
            fr: 'L\'attestation amiante expire (10 ans maximum)'
        },
        body: {
            en: 'An asbestos certificate is valid for at most 10 years, and shorter if the report says so. You need a valid one to sell, and by 2032 every owner of a pre-2001 building in Flanders must hold one.',
            nl: 'Een asbestattest is maximaal 10 jaar geldig, korter als het verslag dat zegt. U hebt een geldig attest nodig om te verkopen, en tegen 2032 moet elke eigenaar van een gebouw van voor 2001 in Vlaanderen er een hebben.',
            fr: 'Une attestation amiante est valable 10 ans au maximum, moins si le rapport le précise. Elle est nécessaire pour vendre, et d\'ici 2032 tout propriétaire d\'un bâtiment antérieur à 2001 en Flandre devra en posséder une.'
        }
    }
];

/* ---------------------------------------------------------------------
 * Legal topics
 * ------------------------------------------------------------------- */
const LEGAL_TOPICS = {

    epc: {
        icon: 'fa-certificate',
        title: {
            en: 'Energy performance certificate (EPC / PEB)',
            nl: 'Energieprestatiecertificaat (EPC)',
            fr: 'Certificat de performance énergétique (PEB)'
        },
        description: {
            en: 'The EPC is mandatory when a home is sold or rented and shows the theoretical energy consumption per square metre. It is the only objective, comparable figure you get about the running cost of the building.',
            nl: 'Het EPC is verplicht bij verkoop en verhuur en toont het theoretische energieverbruik per vierkante meter. Het is het enige objectieve, vergelijkbare cijfer dat u krijgt over de gebruikskost van het gebouw.',
            fr: 'Le PEB est obligatoire en cas de vente ou de location et indique la consommation théorique par mètre carré. C\'est le seul chiffre objectif et comparable dont vous disposez sur le coût d\'usage du bâtiment.'
        },
        why: {
            en: 'A bad label is not only a high bill. In Flanders it also carries a legal renovation obligation that follows the building, which makes it a concrete cost you can put on the negotiating table.',
            nl: 'Een slecht label is niet alleen een hoge factuur. In Vlaanderen hangt er ook een wettelijke renovatieverplichting aan vast die het gebouw volgt, waardoor het een concrete kost wordt die u op tafel kunt leggen.',
            fr: 'Un mauvais label n\'est pas qu\'une facture élevée. En Flandre, il s\'accompagne d\'une obligation légale de rénovation qui suit le bâtiment : un coût concret à mettre sur la table de négociation.'
        },
        regions: {
            flanders: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Label E or F: renovate to at least label D within 6 years of the deed',
                    nl: 'Label E of F: renoveren tot minstens label D binnen 6 jaar na de akte',
                    fr: 'Label E ou F : rénover jusqu\'au label D minimum dans les 6 ans suivant l\'acte'
                },
                detail: {
                    en: 'Valid for 10 years. Since 1 January 2023 the buyer of a home with label E or F must reach at least label D, proven with a new EPC. The period was raised from 5 to 6 years (finalised 12/12/2025) and applies to running as well as new transfers. It follows the property: sell within the period and the next buyer inherits the remaining time. Not complying can lead to an administrative fine of 500 to 5,000 EUR for a residential unit, plus a new deadline. Separately, from 1 January 2030 rented homes must reach a minimum label, tightening in steps to 2040.',
                    nl: '10 jaar geldig. Sinds 1 januari 2023 moet de koper van een woning met label E of F minstens label D halen, bewezen met een nieuw EPC. De termijn werd verhoogd van 5 naar 6 jaar (definitief op 12/12/2025) en geldt voor lopende én nieuwe overdrachten. Ze volgt het gebouw: verkoopt u binnen die termijn, dan erft de volgende koper de resterende tijd. Niet naleven kan leiden tot een administratieve boete van 500 tot 5.000 euro voor een woning, plus een nieuwe termijn. Daarnaast moeten verhuurde woningen vanaf 1 januari 2030 een minimaal label halen, dat stapsgewijs verstrengt tot 2040.',
                    fr: 'Valable 10 ans. Depuis le 1er janvier 2023, l\'acheteur d\'un logement de label E ou F doit atteindre au moins le label D, prouvé par un nouveau PEB. Le délai est passé de 5 à 6 ans (définitif le 12/12/2025) et s\'applique aux transferts en cours comme aux nouveaux. Il suit le bien : en cas de revente dans ce délai, l\'acheteur suivant hérite du temps restant. Le non-respect peut entraîner une amende administrative de 500 à 5 000 EUR pour un logement, plus un nouveau délai. Par ailleurs, à partir du 1er janvier 2030, les logements loués devront atteindre un label minimum, renforcé par paliers jusqu\'en 2040.'
                },
                sources: [
                    { label: 'EPC (Vlaanderen)', url: 'https://www.vlaanderen.be/energieprestatiecertificaten-epcs' },
                    { label: 'Renovatieverplichting', url: 'https://www.vlaanderen.be/renovatieverplichting-voor-residentiele-gebouwen' },
                    { label: 'Minimaal EPC-label vanaf 2030', url: 'https://www.vlaanderen.be/bouwen-wonen-en-energie/veilig-gezond-en-kwaliteitsvol-wonen/woningkwaliteitsnormen/minimaal-epc-label-vanaf-2030' }
                ]
            },
            wallonia: {
                status: 'unverified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'PEB certificate mandatory at sale and rental - no equivalent renovation obligation confirmed',
                    nl: 'PEB-certificaat verplicht bij verkoop en verhuur - geen gelijkaardige renovatieverplichting bevestigd',
                    fr: 'Certificat PEB obligatoire à la vente et à la location - aucune obligation de rénovation équivalente confirmée'
                },
                detail: {
                    en: 'The PEB certificate is required when a home is sold or let. We could NOT confirm a Flemish-style renovation obligation for Wallonia on an official source, and the validity period could not be confirmed either. Wallonia has announced a long-term framework aiming at PEB A by 2050. Check the official démarche page for your situation before you rely on this.',
                    nl: 'Het PEB-certificaat is vereist bij verkoop of verhuur. We konden op een officiële bron GEEN renovatieverplichting naar Vlaams model voor Wallonië bevestigen, en ook de geldigheidsduur niet. Wallonië kondigde wel een langetermijnkader aan dat mikt op PEB A tegen 2050. Controleer de officiële démarche-pagina voor uw situatie.',
                    fr: 'Le certificat PEB est requis en cas de vente ou de location. Nous n\'avons PAS pu confirmer sur une source officielle une obligation de rénovation comparable à celle de la Flandre, ni la durée de validité. La Wallonie a annoncé un cadre à long terme visant le PEB A en 2050. Vérifiez la page démarche officielle pour votre situation.'
                },
                sources: [
                    { label: 'Obtenir un certificat PEB (Wallonie)', url: 'https://www.wallonie.be/fr/demarches/obtenir-un-certificat-peb' }
                ]
            },
            brussels: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'PEB certificate valid 10 years, mandatory at sale and at rental',
                    nl: 'EPB-certificaat 10 jaar geldig, verplicht bij verkoop en verhuur',
                    fr: 'Certificat PEB valable 10 ans, obligatoire à la vente et à la location'
                },
                detail: {
                    en: 'A PEB certificate for a dwelling is valid for 10 years and must be available when the property is put on the market, for both sale and rental. Brussels works towards long-term targets for the building stock rather than a per-purchase renovation obligation; we could not confirm an obligation tied to your individual purchase.',
                    nl: 'Een EPB-certificaat voor een woning is 10 jaar geldig en moet beschikbaar zijn zodra het pand op de markt komt, zowel bij verkoop als verhuur. Brussel werkt met langetermijndoelstellingen voor het gebouwenpark eerder dan met een renovatieverplichting per aankoop; een verplichting gekoppeld aan uw individuele aankoop konden we niet bevestigen.',
                    fr: 'Un certificat PEB pour un logement est valable 10 ans et doit être disponible dès la mise sur le marché, à la vente comme à la location. Bruxelles fonctionne avec des objectifs à long terme pour le parc immobilier plutôt qu\'avec une obligation de rénovation par achat ; nous n\'avons pas pu confirmer d\'obligation liée à votre achat individuel.'
                },
                sources: [
                    { label: 'Certificat PEB d\'un logement (Bruxelles)', url: 'https://environnement.brussels/citoyen/reglementation-et-inspection/obligations-et-autorisations/le-certificat-peb-dun-logement-en-region-bruxelloise' },
                    { label: 'EPB-certificaten (Leefmilieu Brussel)', url: 'https://leefmilieu.brussels/pro/regelgeving-en-inspectie/verplichtingen-en-vergunningen/epb-certificaten' }
                ]
            }
        }
    },

    electrical: {
        icon: 'fa-bolt',
        title: {
            en: 'Electrical installation inspection (RGIE / AREI)',
            nl: 'Keuring van de elektrische installatie (AREI)',
            fr: 'Contrôle de l\'installation électrique (RGIE)'
        },
        description: {
            en: 'This is FEDERAL law, so the same rule applies in all three regions. A report from a recognised inspection body is mandatory when a residential unit is sold. An inspection is valid for 25 years.',
            nl: 'Dit is FEDERALE wetgeving, dus dezelfde regel geldt in alle drie de gewesten. Een verslag van een erkend keuringsorganisme is verplicht bij de verkoop van een woning. Een keuring is 25 jaar geldig.',
            fr: 'Il s\'agit d\'une réglementation FÉDÉRALE : la même règle s\'applique dans les trois régions. Un rapport d\'un organisme agréé est obligatoire lors de la vente d\'un logement. Un contrôle est valable 25 ans.'
        },
        why: {
            en: 'Read the report itself, not the summary. The infractions range from a missing cover plate to a full rewire, a difference of many thousands of euros - which makes it one of the strongest price-negotiation levers a buyer has. An unsafe installation is also a fire and electrocution risk, and an insurer can reduce a payout after an incident caused by a known defect.',
            nl: 'Lees het verslag zelf, niet de samenvatting. De inbreuken gaan van een ontbrekend afdekplaatje tot een volledige herbekabeling, een verschil van vele duizenden euro\'s - meteen een van de sterkste onderhandelingsargumenten die een koper heeft. Een onveilige installatie is bovendien een brand- en elektrocutierisico, en een verzekeraar kan een uitkering verminderen na een incident door een gekend gebrek.',
            fr: 'Lisez le rapport lui-même, pas le résumé. Les infractions vont d\'un couvercle manquant à un recâblage complet, soit plusieurs milliers d\'euros d\'écart : c\'est l\'un des leviers de négociation les plus puissants pour un acheteur. Une installation dangereuse représente aussi un risque d\'incendie et d\'électrocution, et l\'assureur peut réduire une indemnisation après un sinistre dû à un défaut connu.'
        },
        regions: {
            flanders: { sameAs: 'federal' },
            wallonia: { sameAs: 'federal' },
            brussels: { sameAs: 'federal' },
            federal: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Non-compliant installation: 18 months from the deed to correct and re-inspect',
                    nl: 'Niet-conforme installatie: 18 maanden vanaf de akte om in orde te brengen en te herkeuren',
                    fr: 'Installation non conforme : 18 mois à partir de l\'acte pour corriger et recontrôler'
                },
                detail: {
                    en: 'A domestic installation is inspected periodically every 25 years, and a valid report must be handed over when a residential unit is sold. If the report says "non-compliant", the buyer has 18 months from the date of the deed to have the infractions corrected and the installation re-inspected by a recognised body. The sale itself is not blocked, which is exactly why buyers must read the report before making an offer.',
                    nl: 'Een huishoudelijke installatie wordt periodiek om de 25 jaar gekeurd, en bij verkoop van een woning moet een geldig verslag overhandigd worden. Staat er "niet conform", dan heeft de koper 18 maanden vanaf de datum van de akte om de inbreuken te laten wegwerken en de installatie opnieuw te laten keuren door een erkend organisme. De verkoop zelf wordt niet geblokkeerd - net daarom moet u het verslag lezen vóór uw bod.',
                    fr: 'Une installation domestique est contrôlée périodiquement tous les 25 ans, et un rapport valable doit être remis lors de la vente d\'un logement. S\'il indique « non conforme », l\'acheteur dispose de 18 mois à partir de la date de l\'acte pour faire corriger les infractions et faire recontrôler l\'installation par un organisme agréé. La vente n\'est pas bloquée pour autant : raison de plus pour lire le rapport avant de faire une offre.'
                },
                sources: [
                    { label: 'Controle van huishoudelijke installaties (FOD Economie)', url: 'https://economie.fgov.be/nl/themas/energie/bronnen-en-dragers-van-energie/elektriciteit/veiligheid-en-controle-van/controle-van-huishoudelijke' },
                    { label: 'Elektriciteit (FOD Economie)', url: 'https://economie.fgov.be/nl/themas/energie/elektriciteit' }
                ]
            }
        }
    },

    asbestos: {
        icon: 'fa-triangle-exclamation',
        title: {
            en: 'Asbestos certificate (asbestattest)',
            nl: 'Asbestattest',
            fr: 'Attestation amiante'
        },
        description: {
            en: 'A non-destructive inventory by a certified expert listing every asbestos-containing material that can be found without damaging the building, its condition, and whether it is safely bound or a health risk.',
            nl: 'Een niet-destructieve inventaris door een gecertificeerd deskundige met alle asbesthoudende materialen die gevonden kunnen worden zonder het gebouw te beschadigen, hun toestand, en of ze veilig gebonden zijn of een gezondheidsrisico vormen.',
            fr: 'Un inventaire non destructif réalisé par un expert certifié, listant chaque matériau contenant de l\'amiante repérable sans endommager le bâtiment, son état, et s\'il est lié de façon sûre ou constitue un risque sanitaire.'
        },
        why: {
            en: 'Asbestos fibres cause asbestosis, lung cancer and mesothelioma, and the danger appears the moment material is damaged, drilled, sawn or weathered. Intact bonded asbestos may legally stay in place, but as soon as you renovate it must be removed by a certified company. Budget roughly 20-100 EUR/m2 for removal plus the replacement material. Reading the certificate before you bid turns an unknown risk into a number.',
            nl: 'Asbestvezels veroorzaken asbestose, longkanker en mesothelioom, en het gevaar ontstaat zodra materiaal beschadigd, geboord, gezaagd of verweerd raakt. Intact gebonden asbest mag wettelijk blijven zitten, maar zodra u renoveert moet het door een gecertificeerd bedrijf verwijderd worden. Reken op ruwweg 20-100 EUR/m2 voor verwijdering plus het vervangmateriaal. Het attest lezen vóór uw bod zet een onbekend risico om in een cijfer.',
            fr: 'Les fibres d\'amiante provoquent asbestose, cancer du poumon et mésothéliome, et le danger apparaît dès que le matériau est abîmé, percé, scié ou dégradé par les intempéries. L\'amiante lié intact peut légalement rester en place, mais dès que vous rénovez il doit être retiré par une entreprise certifiée. Comptez environ 20-100 EUR/m2 pour le retrait, plus le matériau de remplacement. Lire l\'attestation avant de faire une offre transforme un risque inconnu en un chiffre.'
        },
        regions: {
            flanders: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Mandatory at sale for buildings from before 2001; every owner must hold one by 2032',
                    nl: 'Verplicht bij verkoop voor gebouwen van vóór 2001; elke eigenaar moet er een hebben tegen 2032',
                    fr: 'Obligatoire à la vente pour les bâtiments antérieurs à 2001 ; tout propriétaire doit en posséder une d\'ici 2032'
                },
                detail: {
                    en: 'Required for the transfer of an accessible construction built before 2001 on a plot of at least 20 m2. Standard validity is 10 years, shorter if the report says so. By 2032 every owner of such a building must hold a certificate, whether or not they plan to sell. Removal must be done by a certified company.',
                    nl: 'Vereist bij de overdracht van een toegankelijke constructie gebouwd vóór 2001 op een perceel van minstens 20 m2. Standaard 10 jaar geldig, korter als het verslag dat aangeeft. Tegen 2032 moet elke eigenaar van zo\'n gebouw een attest hebben, ongeacht verkoopplannen. Verwijdering moet door een gecertificeerd bedrijf gebeuren.',
                    fr: 'Requise lors du transfert d\'une construction accessible bâtie avant 2001 sur une parcelle d\'au moins 20 m2. Validité standard de 10 ans, moins si le rapport le précise. D\'ici 2032, tout propriétaire d\'un tel bâtiment devra en posséder une, qu\'il vende ou non. Le retrait doit être confié à une entreprise certifiée.'
                },
                sources: [
                    { label: 'Asbestattest (Vlaanderen)', url: 'https://www.vlaanderen.be/asbestattest' },
                    { label: 'OVAM - asbest', url: 'https://www.ovam.be/asbest' }
                ]
            },
            wallonia: {
                status: 'not-applicable',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'No asbestos certificate is required at sale in Wallonia',
                    nl: 'In Wallonië is geen asbestattest vereist bij verkoop',
                    fr: 'Aucune attestation amiante n\'est exigée à la vente en Wallonie'
                },
                detail: {
                    en: 'The asbestos certificate is a Flemish instrument. In Wallonia there is no equivalent document that the seller must hand over. That does NOT mean there is no asbestos: buildings from before 2001 anywhere in Belgium can contain it, and worker-protection rules still apply to any contractor working on it. If the building is from before 2001, commission your own asbestos inventory before you renovate.',
                    nl: 'Het asbestattest is een Vlaams instrument. In Wallonië bestaat er geen gelijkwaardig document dat de verkoper moet overhandigen. Dat betekent NIET dat er geen asbest is: gebouwen van vóór 2001 kunnen overal in België asbest bevatten, en de regels voor werknemersbescherming gelden nog altijd voor elke aannemer die eraan werkt. Laat bij een gebouw van vóór 2001 zelf een asbestinventaris opmaken vóór u renoveert.',
                    fr: 'L\'attestation amiante est un instrument flamand. En Wallonie, aucun document équivalent ne doit être remis par le vendeur. Cela ne signifie PAS qu\'il n\'y a pas d\'amiante : partout en Belgique, les bâtiments antérieurs à 2001 peuvent en contenir, et les règles de protection des travailleurs s\'appliquent toujours à l\'entrepreneur. Pour un bâtiment antérieur à 2001, faites réaliser votre propre inventaire amiante avant de rénover.'
                },
                sources: [
                    { label: 'Wallonie - portail officiel', url: 'https://www.wallonie.be/fr' }
                ]
            },
            brussels: {
                status: 'not-applicable',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'No asbestos certificate is required at sale in Brussels',
                    nl: 'In Brussel is geen asbestattest vereist bij verkoop',
                    fr: 'Aucune attestation amiante n\'est exigée à la vente à Bruxelles'
                },
                detail: {
                    en: 'The asbestos certificate is a Flemish instrument and has no Brussels equivalent that the seller must provide. Asbestos is still very common in the Brussels housing stock, so for any building from before 2001 you should commission your own inventory before renovating, and a certified company must carry out any removal.',
                    nl: 'Het asbestattest is een Vlaams instrument en heeft geen Brussels equivalent dat de verkoper moet leveren. Asbest komt in het Brusselse woningbestand nog erg vaak voor: laat bij elk gebouw van vóór 2001 zelf een inventaris opmaken vóór u renoveert, en laat verwijdering altijd door een gecertificeerd bedrijf doen.',
                    fr: 'L\'attestation amiante est un instrument flamand et n\'a pas d\'équivalent bruxellois à charge du vendeur. L\'amiante reste très présent dans le bâti bruxellois : pour tout bâtiment antérieur à 2001, faites réaliser votre propre inventaire avant de rénover, et confiez tout retrait à une entreprise certifiée.'
                },
                sources: [
                    { label: 'Bruxelles Environnement', url: 'https://environnement.brussels/' }
                ]
            }
        }
    },

    soil: {
        icon: 'fa-mountain-sun',
        title: {
            en: 'Soil certificate',
            nl: 'Bodemattest',
            fr: 'Attestation / extrait relatif au sol'
        },
        description: {
            en: 'A document from the regional soil authority stating whether the plot is known as a risk site and whether contamination has been recorded.',
            nl: 'Een document van de gewestelijke bodeminstantie dat aangeeft of het perceel gekend is als risicogrond en of er verontreiniging geregistreerd is.',
            fr: 'Un document de l\'autorité régionale du sol indiquant si la parcelle est connue comme site à risque et si une pollution y est enregistrée.'
        },
        why: {
            en: 'Soil remediation is one of the few costs that can exceed the value of the property itself. Old petrol stations, dry cleaners, workshops, farms and buried heating-oil tanks are the classic sources. Even a clean certificate is valuable proof for the day you sell.',
            nl: 'Bodemsanering is een van de weinige kosten die de waarde van het pand zelf kunnen overstijgen. Oude tankstations, droogkuisen, werkplaatsen, landbouwbedrijven en ingegraven stookolietanks zijn de klassieke bronnen. Zelfs een blanco attest is waardevol bewijs voor de dag dat u verkoopt.',
            fr: 'L\'assainissement du sol est l\'un des rares coûts qui peuvent dépasser la valeur du bien lui-même. Anciennes stations-service, pressings, ateliers, exploitations agricoles et citernes à mazout enterrées en sont les sources classiques. Même une attestation vierge est une preuve précieuse le jour où vous revendrez.'
        },
        regions: {
            flanders: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Bodemattest must be available before the compromis is signed',
                    nl: 'Bodemattest moet beschikbaar zijn vóór de compromis getekend wordt',
                    fr: 'Le bodemattest doit être disponible avant la signature du compromis'
                },
                detail: {
                    en: 'The seller requests the certificate from OVAM and must hand it over before the private sale agreement. Delivery takes about 14 days for a normal plot and up to 60 days for a risk site, so it is worth asking early. If the certificate is missing, the sale can under certain conditions be annulled.',
                    nl: 'De verkoper vraagt het attest aan bij OVAM en moet het vóór de onderhandse verkoopovereenkomst overhandigen. Levering duurt ongeveer 14 dagen voor een gewoon perceel en tot 60 dagen voor een risicogrond, dus vraag het tijdig op. Ontbreekt het attest, dan kan de verkoop onder bepaalde voorwaarden nietig verklaard worden.',
                    fr: 'Le vendeur demande l\'attestation à l\'OVAM et doit la remettre avant le compromis de vente. Le délai est d\'environ 14 jours pour une parcelle normale et jusqu\'à 60 jours pour un terrain à risque : demandez-la tôt. En son absence, la vente peut, sous certaines conditions, être annulée.'
                },
                sources: [
                    { label: 'Bodemattest (Vlaanderen)', url: 'https://www.vlaanderen.be/bodemattest' },
                    { label: 'OVAM - bodemattest', url: 'https://www.ovam.be/bodemattest' }
                ]
            },
            wallonia: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Extrait conforme de la BDES required before any transfer',
                    nl: 'Extrait conforme uit de BDES vereist vóór elke overdracht',
                    fr: 'Extrait conforme de la BDES requis avant toute cession'
                },
                detail: {
                    en: 'Wallonia uses the Banque de Données de l\'Etat des Sols (BDES). A conforming extract must be obtained before any transfer of the land. Ask the notary who requests it and how long it takes in your commune, because it is a classic cause of delay just before signing.',
                    nl: 'Wallonië werkt met de Banque de Données de l\'Etat des Sols (BDES). Een extrait conforme moet vóór elke overdracht van de grond bekomen worden. Vraag de notaris wie het aanvraagt en hoe lang het in uw gemeente duurt - dit is een klassieke oorzaak van vertraging vlak voor de ondertekening.',
                    fr: 'La Wallonie utilise la Banque de Données de l\'Etat des Sols (BDES). Un extrait conforme doit être obtenu avant toute cession du terrain. Demandez au notaire qui l\'introduit et quel est le délai dans votre commune : c\'est une cause classique de retard juste avant la signature.'
                },
                sources: [
                    { label: 'BDES - achat d\'un terrain', url: 'https://environnement.wallonie.be/home/milieux/sol/bdes/achat-d-un-terrain.html' },
                    { label: 'Portail sol - Wallonie', url: 'https://sol.environnement.wallonie.be/' }
                ]
            },
            brussels: {
                status: 'unverified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'A soil attestation from Bruxelles Environnement applies - confirm the timing with your notary',
                    nl: 'Er geldt een bodemattest van Leefmilieu Brussel - bevestig de timing bij uw notaris',
                    fr: 'Une attestation du sol de Bruxelles Environnement s\'applique - confirmez le calendrier avec votre notaire'
                },
                detail: {
                    en: 'Brussels operates its own soil register through Bruxelles Environnement. We could NOT confirm the exact moment in the sale at which the attestation must be delivered on an official page, so treat this as "ask the notary in writing" rather than as a verified deadline.',
                    nl: 'Brussel houdt een eigen bodemregister bij via Leefmilieu Brussel. We konden op een officiële pagina NIET bevestigen op welk exact moment in de verkoop het attest geleverd moet worden - behandel dit dus als "vraag het schriftelijk aan de notaris" in plaats van als een geverifieerde termijn.',
                    fr: 'Bruxelles tient son propre registre des sols via Bruxelles Environnement. Nous n\'avons PAS pu confirmer sur une page officielle le moment exact de la vente auquel l\'attestation doit être délivrée : considérez-le comme « à demander par écrit au notaire » plutôt que comme un délai vérifié.'
                },
                sources: [
                    { label: 'Bruxelles Environnement', url: 'https://environnement.brussels/' }
                ]
            }
        }
    },

    heating: {
        icon: 'fa-fire',
        title: {
            en: 'Heating maintenance and inspection',
            nl: 'Onderhoud en keuring van de verwarming',
            fr: 'Entretien et contrôle du chauffage'
        },
        description: {
            en: 'Central heating appliances must be serviced periodically by a recognised technician, who issues a maintenance certificate. Intervals are set per region.',
            nl: 'Centrale verwarmingstoestellen moeten periodiek onderhouden worden door een erkend technicus, die een onderhoudsattest aflevert. De intervallen worden per gewest bepaald.',
            fr: 'Les appareils de chauffage central doivent être entretenus périodiquement par un technicien agréé, qui délivre une attestation d\'entretien. Les intervalles sont fixés par région.'
        },
        why: {
            en: 'Carbon monoxide is odourless and still kills people in Belgium every winter, and a badly serviced or badly ventilated appliance is the usual cause. Your fire insurance can also be reduced or refused if the maintenance certificates are missing. The certificates additionally reveal the true age of the installation - a boiler older than 15-20 years is a 5,000-15,000 EUR replacement you want to know about before you bid.',
            nl: 'Koolstofmonoxide is reukloos en eist in België elke winter nog altijd levens; een slecht onderhouden of slecht geventileerd toestel is de gebruikelijke oorzaak. Uw brandverzekering kan bovendien verminderd of geweigerd worden als de onderhoudsattesten ontbreken. De attesten tonen ook de echte leeftijd van de installatie - een ketel ouder dan 15-20 jaar is een vervanging van 5.000 tot 15.000 EUR die u wilt kennen vóór uw bod.',
            fr: 'Le monoxyde de carbone est inodore et tue encore chaque hiver en Belgique ; un appareil mal entretenu ou mal ventilé en est la cause habituelle. Votre assurance incendie peut aussi être réduite ou refusée si les attestations d\'entretien manquent. Celles-ci révèlent en outre l\'âge réel de l\'installation : une chaudière de plus de 15-20 ans représente un remplacement de 5 000 à 15 000 EUR à connaître avant de faire une offre.'
        },
        regions: {
            flanders: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Liquid fuel (mazout): every year. Gas: every 2 years.',
                    nl: 'Mazout: elk jaar. Gas: om de 2 jaar.',
                    fr: 'Mazout : chaque année. Gaz : tous les 2 ans.'
                },
                detail: {
                    en: 'Maintenance must be performed by a technician recognised for that fuel, who issues a maintenance certificate you should keep with the property file. Ask the seller for the last two reports - they tell you what has already gone wrong.',
                    nl: 'Het onderhoud moet gebeuren door een technicus erkend voor die brandstof, die een onderhoudsattest aflevert dat u bij het woningdossier bewaart. Vraag de verkoper de laatste twee verslagen - die tonen wat er al fout ging.',
                    fr: 'L\'entretien doit être réalisé par un technicien agréé pour ce combustible, qui délivre une attestation à conserver dans le dossier du bien. Demandez au vendeur les deux derniers rapports : ils révèlent ce qui a déjà posé problème.'
                },
                sources: [
                    { label: 'Woningkwaliteit (Vlaanderen)', url: 'https://www.vlaanderen.be/woningkwaliteit' },
                    { label: 'Energiesparen', url: 'https://www.energiesparen.be/' }
                ]
            },
            wallonia: {
                status: 'unverified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Periodic control is compulsory - the interval could not be verified on an official page',
                    nl: 'Periodieke controle is verplicht - het interval kon niet op een officiële pagina bevestigd worden',
                    fr: 'Le contrôle périodique est obligatoire - l\'intervalle n\'a pas pu être vérifié sur une page officielle'
                },
                detail: {
                    en: 'Wallonia requires periodic control of heating installations, but the exact interval per fuel could NOT be confirmed on an official page at the time of the last review. The intervals in Wallonia are known to differ from the Flemish ones, so do not assume the Flemish figures apply. Use the official démarche page below or call 1718 before you rely on a date.',
                    nl: 'Wallonië vereist een periodieke controle van verwarmingsinstallaties, maar het exacte interval per brandstof kon bij de laatste review NIET op een officiële pagina bevestigd worden. De Waalse intervallen verschillen van de Vlaamse, dus ga er niet van uit dat de Vlaamse cijfers gelden. Gebruik de officiële démarche-pagina hieronder of bel 1718 vóór u op een datum vertrouwt.',
                    fr: 'La Wallonie impose un contrôle périodique des installations de chauffage, mais l\'intervalle exact par combustible n\'a PAS pu être confirmé sur une page officielle lors de la dernière vérification. Les intervalles wallons diffèrent des intervalles flamands : ne supposez pas qu\'ils sont identiques. Utilisez la page démarche ci-dessous ou appelez le 1718 avant de vous fier à une date.'
                },
                sources: [
                    { label: 'Faire contrôler son installation de chauffage (Wallonie)', url: 'https://www.wallonie.be/fr/demarches/faire-controler-son-installation-de-chauffage' }
                ]
            },
            brussels: {
                status: 'unverified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Periodic control is compulsory - the interval could not be verified on an official page',
                    nl: 'Periodieke controle is verplicht - het interval kon niet op een officiële pagina bevestigd worden',
                    fr: 'Le contrôle périodique est obligatoire - l\'intervalle n\'a pas pu être vérifié sur une page officielle'
                },
                detail: {
                    en: 'Brussels regulates heating maintenance and periodic control through Bruxelles Environnement, but we could NOT confirm the interval per fuel on an official page at the last review. Ask the technician for the applicable Brussels interval and keep every certificate.',
                    nl: 'Brussel regelt onderhoud en periodieke controle van verwarming via Leefmilieu Brussel, maar we konden bij de laatste review het interval per brandstof NIET op een officiële pagina bevestigen. Vraag de technicus naar het geldende Brusselse interval en bewaar elk attest.',
                    fr: 'Bruxelles réglemente l\'entretien et le contrôle périodique du chauffage via Bruxelles Environnement, mais nous n\'avons PAS pu confirmer l\'intervalle par combustible sur une page officielle. Demandez au technicien l\'intervalle bruxellois applicable et conservez chaque attestation.'
                },
                sources: [
                    { label: 'Bruxelles Environnement', url: 'https://environnement.brussels/' }
                ]
            }
        }
    },

    smokedetector: {
        icon: 'fa-bell',
        title: {
            en: 'Smoke detectors',
            nl: 'Rookmelders',
            fr: 'Détecteurs de fumée'
        },
        description: {
            en: 'Optical smoke detectors are a housing-quality requirement. They have a limited lifetime, usually 10 years, printed on the housing.',
            nl: 'Optische rookmelders zijn een woningkwaliteitsvereiste. Ze hebben een beperkte levensduur, meestal 10 jaar, gedrukt op de behuizing.',
            fr: 'Les détecteurs optiques de fumée relèvent des normes de qualité du logement. Leur durée de vie est limitée, généralement 10 ans, indiquée sur le boîtier.'
        },
        why: {
            en: 'Most fire deaths are caused by smoke inhalation while people are asleep, and a working detector roughly halves that risk. An expired detector counts legally as no detector. Press the test button during the viewing and check the date on the back - it costs nothing and tells you a lot about how the home was maintained.',
            nl: 'De meeste branddoden vallen door rookinademing tijdens de slaap; een werkende melder halveert dat risico ongeveer. Een vervallen melder telt wettelijk als geen melder. Druk tijdens het bezoek op de testknop en kijk naar de datum op de achterkant - het kost niets en zegt veel over het onderhoud van de woning.',
            fr: 'La plupart des décès dans un incendie sont dus à l\'inhalation de fumée pendant le sommeil ; un détecteur en état de marche réduit ce risque de moitié environ. Un détecteur périmé équivaut légalement à une absence de détecteur. Appuyez sur le bouton test lors de la visite et vérifiez la date au dos : c\'est gratuit et très révélateur de l\'entretien du logement.'
        },
        regions: {
            flanders: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Mandatory in every home since 1 January 2020, on every storey',
                    nl: 'Verplicht in elke woning sinds 1 januari 2020, op elke verdieping',
                    fr: 'Obligatoire dans chaque logement depuis le 1er janvier 2020, à chaque étage'
                },
                detail: {
                    en: 'Every dwelling in Flanders must have optical smoke detectors, including owner-occupied homes. A home without them has a category II defect: it is declared unfit for rental and no conformity certificate is issued. Avoid mounting them in kitchens, bathrooms and very dusty spaces.',
                    nl: 'Elke woning in Vlaanderen moet optische rookmelders hebben, ook eigen woningen. Een woning zonder melders heeft een gebrek van categorie II: ze wordt ongeschikt verklaard voor verhuur en er wordt geen conformiteitsattest afgeleverd. Plaats ze niet in keukens, badkamers en erg stoffige ruimtes.',
                    fr: 'Chaque logement en Flandre doit être équipé de détecteurs optiques, y compris les logements occupés par leur propriétaire. Un logement sans détecteur présente un défaut de catégorie II : il est déclaré impropre à la location et aucune attestation de conformité n\'est délivrée. Évitez de les installer dans les cuisines, salles de bain et locaux très poussiéreux.'
                },
                sources: [
                    { label: 'Rookmelders (Vlaanderen)', url: 'https://www.vlaanderen.be/bouwen-wonen-en-energie/veilig-gezond-en-kwaliteitsvol-wonen/woningkwaliteitsnormen/rookmelders' }
                ]
            },
            wallonia: {
                status: 'unverified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Smoke detectors are compulsory - the exact number and placement could not be verified',
                    nl: 'Rookmelders zijn verplicht - het exacte aantal en de plaatsing konden niet bevestigd worden',
                    fr: 'Les détecteurs de fumée sont obligatoires - le nombre exact et l\'emplacement n\'ont pas pu être vérifiés'
                },
                detail: {
                    en: 'Wallonia has required smoke detectors in dwellings for many years, but we could NOT confirm the current number and placement rules on an official page at the last review. Follow the official démarche page below, and in any case fit at least one working detector per storey.',
                    nl: 'Wallonië verplicht al vele jaren rookmelders in woningen, maar we konden bij de laatste review de huidige regels rond aantal en plaatsing NIET op een officiële pagina bevestigen. Volg de officiële démarche-pagina hieronder en plaats in elk geval minstens één werkende melder per verdieping.',
                    fr: 'La Wallonie impose des détecteurs de fumée dans les logements depuis de nombreuses années, mais nous n\'avons PAS pu confirmer les règles actuelles de nombre et d\'emplacement sur une page officielle. Suivez la page démarche ci-dessous et installez en tout cas au moins un détecteur en état de marche par étage.'
                },
                sources: [
                    { label: 'Installer un détecteur de fumée (Wallonie)', url: 'https://www.wallonie.be/fr/demarches/installer-un-detecteur-de-fumee-dans-son-logement' }
                ]
            },
            brussels: {
                status: 'unverified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Smoke detectors are part of the Brussels housing standards - details not verified',
                    nl: 'Rookmelders maken deel uit van de Brusselse woningnormen - details niet geverifieerd',
                    fr: 'Les détecteurs de fumée font partie des normes bruxelloises du logement - détails non vérifiés'
                },
                detail: {
                    en: 'Detectors appear in the Brussels minimum housing requirements, but we could NOT confirm the obligation date, number or placement on an official page. Check with logement.brussels or Homegrade, and fit at least one working detector per storey regardless.',
                    nl: 'Melders komen voor in de Brusselse minimumnormen voor woningen, maar we konden de datum van de verplichting, het aantal of de plaatsing NIET op een officiële pagina bevestigen. Vraag na bij logement.brussels of Homegrade, en plaats hoe dan ook minstens één werkende melder per verdieping.',
                    fr: 'Les détecteurs figurent dans les exigences minimales bruxelloises du logement, mais nous n\'avons PAS pu confirmer la date d\'obligation, le nombre ni l\'emplacement sur une page officielle. Renseignez-vous auprès de logement.brussels ou Homegrade, et installez de toute façon au moins un détecteur par étage.'
                },
                sources: [
                    { label: 'Logement Bruxelles', url: 'https://logement.brussels/' },
                    { label: 'Homegrade', url: 'https://homegrade.brussels/' }
                ]
            }
        }
    },

    oiltank: {
        icon: 'fa-oil-can',
        title: {
            en: 'Heating oil tank (mazout / citerne)',
            nl: 'Stookolietank (mazouttank)',
            fr: 'Citerne à mazout'
        },
        description: {
            en: 'Buried and cellar tanks are subject to installation and periodic inspection rules, and abandoned tanks must be emptied, cleaned and certified rather than simply left in place.',
            nl: 'Ingegraven tanks en keldertanks vallen onder installatie- en periodieke keuringsregels, en buiten gebruik gestelde tanks moeten geledigd, gereinigd en gecertificeerd worden in plaats van gewoon te blijven staan.',
            fr: 'Les citernes enterrées et en cave sont soumises à des règles d\'installation et de contrôle périodique, et une citerne abandonnée doit être vidée, nettoyée et certifiée plutôt que simplement laissée en place.'
        },
        why: {
            en: 'A leaking tank is a soil-contamination case that can cost tens of thousands of euros to remediate, and the liability follows the land, not the person who installed it. Always ask for the installation plate, the last inspection certificate, and - if the tank is out of use - the neutralisation certificate.',
            nl: 'Een lekkende tank is een bodemverontreinigingsdossier dat tienduizenden euro\'s kan kosten om te saneren, en de aansprakelijkheid volgt de grond, niet degene die de tank plaatste. Vraag altijd het installatieplaatje, het laatste keuringsattest en - als de tank buiten gebruik is - het attest van buitengebruikstelling.',
            fr: 'Une citerne qui fuit devient un dossier de pollution du sol dont l\'assainissement peut coûter des dizaines de milliers d\'euros, et la responsabilité suit le terrain, pas celui qui l\'a installée. Demandez toujours la plaquette d\'installation, la dernière attestation de contrôle et, si la citerne est hors service, l\'attestation de neutralisation.'
        },
        regions: {
            flanders: {
                status: 'unverified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Periodic inspection applies - the interval depends on tank type and location',
                    nl: 'Periodieke keuring is van toepassing - het interval hangt af van het type en de plaatsing',
                    fr: 'Un contrôle périodique s\'applique - l\'intervalle dépend du type et de l\'emplacement'
                },
                detail: {
                    en: 'Flanders regulates oil tanks through VLAREM, with different rules for buried versus above-ground tanks and for tanks above certain volumes. We could NOT confirm the current intervals on a single official page at the last review, so ask a recognised technician and get it in writing.',
                    nl: 'Vlaanderen regelt stookolietanks via VLAREM, met verschillende regels voor ingegraven versus bovengrondse tanks en voor tanks boven bepaalde volumes. We konden bij de laatste review de huidige intervallen NIET op één officiële pagina bevestigen - vraag een erkend technicus en zet het op papier.',
                    fr: 'La Flandre encadre les citernes à mazout via VLAREM, avec des règles différentes pour les citernes enterrées et aériennes et selon le volume. Nous n\'avons PAS pu confirmer les intervalles actuels sur une page officielle unique : demandez à un technicien agréé et exigez un écrit.'
                },
                sources: [
                    { label: 'Vlaanderen - bouwen, wonen en energie', url: 'https://www.vlaanderen.be/bouwen-wonen-en-energie/kopen-en-verkopen' }
                ]
            },
            wallonia: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Periodic controls and maintenance are compulsory',
                    nl: 'Periodieke controles en onderhoud zijn verplicht',
                    fr: 'Les contrôles périodiques et l\'entretien sont obligatoires'
                },
                detail: {
                    en: 'Wallonia states that periodic controls and maintenance of heating-oil tanks are indispensable, with rules depending on tank volume and whether it is buried. The exact interval for your tank should be confirmed by the recognised technician who performs the control.',
                    nl: 'Wallonië stelt dat periodieke controles en onderhoud van stookolietanks onmisbaar zijn, met regels afhankelijk van het volume en of de tank ingegraven is. Het exacte interval voor uw tank laat u bevestigen door de erkende technicus die de controle uitvoert.',
                    fr: 'La Wallonie indique que les contrôles périodiques et l\'entretien des citernes à mazout sont indispensables, avec des règles selon le volume et le caractère enterré ou non. L\'intervalle exact pour votre citerne doit être confirmé par le technicien agréé qui réalise le contrôle.'
                },
                sources: [
                    { label: 'Citernes - Environnement Wallonie', url: 'https://environnement.wallonie.be/home/milieux/sol/citernes.html' }
                ]
            },
            brussels: {
                status: 'unverified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Tanks above a certain volume need an environmental permit - details not verified',
                    nl: 'Tanks boven een bepaald volume hebben een milieuvergunning nodig - details niet geverifieerd',
                    fr: 'Les citernes au-delà d\'un certain volume nécessitent un permis d\'environnement - détails non vérifiés'
                },
                detail: {
                    en: 'In Brussels, storage of heating oil above certain volumes is a classified installation requiring an environmental permit. We could NOT confirm the current thresholds and inspection intervals on an official page. Ask Bruxelles Environnement or your commune before you rely on a figure.',
                    nl: 'In Brussel is de opslag van stookolie boven bepaalde volumes een ingedeelde inrichting waarvoor een milieuvergunning nodig is. We konden de huidige drempels en keuringsintervallen NIET op een officiële pagina bevestigen. Vraag het na bij Leefmilieu Brussel of uw gemeente.',
                    fr: 'À Bruxelles, le stockage de mazout au-delà de certains volumes constitue une installation classée nécessitant un permis d\'environnement. Nous n\'avons PAS pu confirmer les seuils et intervalles actuels sur une page officielle. Renseignez-vous auprès de Bruxelles Environnement ou de votre commune.'
                },
                sources: [
                    { label: 'Bruxelles Environnement', url: 'https://environnement.brussels/' }
                ]
            }
        }
    },

    registration: {
        icon: 'fa-euro-sign',
        title: {
            en: 'Registration duty (purchase tax)',
            nl: 'Registratiebelasting (verkooprecht)',
            fr: 'Droits d\'enregistrement'
        },
        description: {
            en: 'The tax you pay on the purchase price. After the price itself it is usually the single largest amount in the transaction, and it differs sharply between the three regions.',
            nl: 'De belasting die u op de aankoopprijs betaalt. Na de prijs zelf is dit meestal het grootste bedrag in de transactie, en het verschilt sterk tussen de drie gewesten.',
            fr: 'La taxe payée sur le prix d\'achat. Après le prix lui-même, c\'est généralement le montant le plus élevé de la transaction, et il varie fortement entre les trois régions.'
        },
        why: {
            en: 'Buyers routinely forget that the tax, the notary fee and the mortgage costs come on top of the price. Calculate the full amount before you make an offer, and check whether you qualify for the reduced rate or abattement for your sole and own home - the difference can be tens of thousands of euros.',
            nl: 'Kopers vergeten stelselmatig dat de belasting, het notarisereloon en de kredietkosten bovenop de prijs komen. Bereken het volledige bedrag vóór uw bod en controleer of u in aanmerking komt voor het verlaagde tarief of het abattement voor uw enige eigen woning - het verschil kan tienduizenden euro\'s bedragen.',
            fr: 'Les acheteurs oublient régulièrement que la taxe, les honoraires du notaire et les frais de crédit s\'ajoutent au prix. Calculez le montant total avant de faire une offre et vérifiez si vous avez droit au taux réduit ou à l\'abattement pour votre habitation propre et unique : l\'écart peut atteindre des dizaines de milliers d\'euros.'
        },
        regions: {
            flanders: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: '2% for the sole and own home (since 1 January 2025), 12% otherwise - conditions tightened on 1 January 2026',
                    nl: '2% voor de enige eigen woning (sinds 1 januari 2025), 12% in de andere gevallen - voorwaarden verstrengd op 1 januari 2026',
                    fr: '2 % pour l\'habitation propre et unique (depuis le 1er janvier 2025), 12 % sinon - conditions durcies au 1er janvier 2026'
                },
                detail: {
                    en: 'The rate for the sole and own home was lowered from 3% to 2% on 1 January 2025. The date of the notarial deed decides, not the date of the compromis: a 2024 compromis with a 2025 deed already gets 2%. The general rate is 12% and has applied since 1 January 2022 to agreements signed from that date. Unbuilt agricultural land and nature reserves keep a 10% rate, and a 1% rate exists for a thorough energy renovation and for protected monuments. For sales agreements the conditions were tightened from 1 January 2026: the buyers must all be natural persons - if a legal entity is a co-buyer the whole purchase is taxed at the ordinary rate; only purchases of the full ownership qualify, so split purchases of only usufruct or only bare ownership are excluded, judged per buyer; and the buyer must undertake to register at the address of the home within three years and to stay registered there for at least one uninterrupted year.',
                    nl: 'Het tarief voor de enige eigen woning daalde op 1 januari 2025 van 3% naar 2%. De datum van de notariële akte telt, niet die van het compromis: een compromis uit 2024 met een akte in 2025 krijgt al 2%. Het algemene tarief bedraagt 12% en geldt sinds 1 januari 2022 voor overeenkomsten vanaf die datum. Onbebouwde landbouwgronden en natuurgebieden behouden 10%, en er bestaat een tarief van 1% voor een ingrijpende energetische renovatie en voor beschermde monumenten. Voor verkoopovereenkomsten werden de voorwaarden verstrengd vanaf 1 januari 2026: de kopers moeten allemaal natuurlijke personen zijn - is een rechtspersoon mede-verkrijger, dan wordt de hele aankoop belast aan het gewone tarief; alleen aankopen van de volle eigendom komen nog in aanmerking, dus gesplitste aankopen van enkel vruchtgebruik of enkel naakte eigendom vallen weg, en dat wordt per verkrijger beoordeeld; en de koper moet zich ertoe verbinden zich binnen de drie jaar op het adres van de woning in te schrijven en er minstens één jaar ononderbroken ingeschreven te blijven.',
                    fr: 'Le taux pour l\'habitation propre et unique est passé de 3 % à 2 % le 1er janvier 2025. C\'est la date de l\'acte notarié qui compte, pas celle du compromis : un compromis de 2024 avec un acte en 2025 bénéficie déjà des 2 %. Le taux général est de 12 % et s\'applique depuis le 1er janvier 2022 aux conventions signées à partir de cette date. Les terres agricoles non bâties et les réserves naturelles conservent 10 %, et un taux de 1 % existe pour une rénovation énergétique importante et pour les monuments classés. Pour les conventions de vente, les conditions ont été durcies au 1er janvier 2026 : les acquéreurs doivent tous être des personnes physiques - si une personne morale est co-acquéreur, l\'achat entier est taxé au taux ordinaire ; seuls les achats en pleine propriété entrent encore en ligne de compte, les achats scindés d\'usufruit seul ou de nue-propriété seule étant exclus, et cela s\'apprécie par acquéreur ; et l\'acquéreur doit s\'engager à s\'inscrire à l\'adresse du logement dans les trois ans et à y rester inscrit au moins un an sans interruption.'
                },
                sources: [
                    { label: 'Verkooprecht enige eigen woning', url: 'https://www.vlaanderen.be/belastingen-en-begroting/vlaamse-belastingen/registratiebelasting/verkooprecht/tarieven-in-het-verkooprecht/het-verkooprecht-bij-de-aankoop-van-de-enige-eigen-woning-overzicht' },
                    { label: 'Verlaagd tarief enige eigen woning', url: 'https://www.vlaanderen.be/belastingen-en-begroting/vlaamse-belastingen/registratiebelasting/verkooprecht/tarieven-in-het-verkooprecht/verlaagd-tarief-in-het-verkooprecht-voor-de-aankoop-van-de-enige-eigen-woning' },
                    { label: 'Algemeen tarief verkooprecht', url: 'https://www.vlaanderen.be/belastingen-en-begroting/vlaamse-belastingen/registratiebelasting/verkooprecht/tarieven-in-het-verkooprecht/algemeen-tarief-in-het-verkooprecht' }
                ]
            },
            wallonia: {
                status: 'unverified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Reduced rate for the sole and own home, higher standard rate otherwise',
                    nl: 'Verlaagd tarief voor de enige eigen woning, hoger standaardtarief in de andere gevallen',
                    fr: 'Taux réduit pour l\'habitation propre et unique, taux standard plus élevé sinon'
                },
                detail: {
                    en: 'Wallonia applies a reduced rate for the sole and own home and a higher standard rate for other purchases. The figures commonly cited are 3% and 12.5%, but we could NOT confirm them on an official Walloon government page at the last review - the notary portal is the practical reference. Always have your notary confirm the exact rate and any abattement in writing before you sign the compromis.',
                    nl: 'Wallonië hanteert een verlaagd tarief voor de enige eigen woning en een hoger standaardtarief voor andere aankopen. De cijfers die vaak circuleren zijn 3% en 12,5%, maar we konden ze bij de laatste review NIET op een officiële Waalse overheidspagina bevestigen - het notarisportaal is de praktische referentie. Laat uw notaris het exacte tarief en een eventueel abattement altijd schriftelijk bevestigen vóór de compromis.',
                    fr: 'La Wallonie applique un taux réduit pour l\'habitation propre et unique et un taux standard plus élevé pour les autres acquisitions. Les chiffres souvent cités sont 3 % et 12,5 %, mais nous n\'avons PAS pu les confirmer sur une page officielle du gouvernement wallon : le portail des notaires est la référence pratique. Faites toujours confirmer par écrit par votre notaire le taux exact et tout abattement avant le compromis.'
                },
                sources: [
                    { label: 'Droits d\'enregistrement en Région wallonne (Notaire.be)', url: 'https://www.notaire.be/immobilier/acheter-et-vendre-un-bien-immobilier/les-frais-lies-lachat/droits-denregistrement-en-region-wallonne' },
                    { label: 'Wallonie - portail officiel', url: 'https://www.wallonie.be/fr' }
                ]
            },
            brussels: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: '12.5%, with an abattement on the first 200,000 EUR for your sole home',
                    nl: '12,5%, met een abattement op de eerste 200.000 EUR voor uw enige woning',
                    fr: '12,5 %, avec un abattement sur les premiers 200 000 EUR pour votre habitation unique'
                },
                detail: {
                    en: 'The standard rate is 12.5%. For your sole home you can apply an abattement on the first 200,000 EUR of the price, subject to conditions: the property must be your only home, the price must stay under the ceiling (600,000 EUR), and you must live there for a minimum period (5 years). Confirm the current ceiling and conditions with your notary, because they have been adjusted several times.',
                    nl: 'Het standaardtarief bedraagt 12,5%. Voor uw enige woning kunt u een abattement toepassen op de eerste 200.000 EUR van de prijs, mits voorwaarden: het moet uw enige woning zijn, de prijs moet onder het plafond blijven (600.000 EUR) en u moet er een minimumperiode wonen (5 jaar). Laat het actuele plafond en de voorwaarden bevestigen door uw notaris - ze zijn al meermaals aangepast.',
                    fr: 'Le taux standard est de 12,5 %. Pour votre habitation unique, un abattement peut s\'appliquer sur les premiers 200 000 EUR du prix, sous conditions : il doit s\'agir de votre seul logement, le prix doit rester sous le plafond (600 000 EUR) et vous devez y habiter une durée minimale (5 ans). Faites confirmer le plafond et les conditions actuels par votre notaire : ils ont déjà été modifiés plusieurs fois.'
                },
                sources: [
                    { label: 'Abattement sur les droits de vente (be.brussels)', url: 'https://be.brussels/fr/impots-financement/impots-et-taxes/fiscalite-immobiliere/droits-denregistrement/abattement-sur-les-droits-de-vente' }
                ]
            }
        }
    },

    water: {
        icon: 'fa-droplet',
        title: {
            en: 'Rainwater, infiltration and drainage inspection',
            nl: 'Hemelwater, infiltratie en keuring privéwaterafvoer',
            fr: 'Eau de pluie, infiltration et contrôle de l\'évacuation privée'
        },
        description: {
            en: 'Two separate obligations sit on top of each other here: what you must install to deal with rainwater on your own plot (tank, infiltration facility, buffer), and the compulsory inspection of the private drainage that proves rain and waste water are correctly separated and connected.',
            nl: 'Hier liggen twee verplichtingen over elkaar: wat u moet plaatsen om hemelwater op uw eigen perceel op te vangen (put, infiltratievoorziening, buffer), en de verplichte keuring van de privéwaterafvoer die aantoont dat regen- en afvalwater correct gescheiden en aangesloten zijn.',
            fr: 'Deux obligations se superposent ici : ce que vous devez installer pour gérer l\'eau de pluie sur votre parcelle (citerne, dispositif d\'infiltration, tampon), et le contrôle obligatoire de l\'évacuation privée qui prouve que l\'eau de pluie et les eaux usées sont correctement séparées et raccordées.'
        },
        why: {
            en: 'This is the single most underestimated cost in a Belgian purchase. Retro-fitting an infiltration crate, a rainwater tank or a separate rainwater network through an existing garden and driveway routinely costs several thousand euros, and it is triggered by works you may already be planning. Worse: if the property does not comply, works that would normally be exempt from a permit lose that exemption.',
            nl: 'Dit is de meest onderschatte kost bij een Belgische aankoop. Een infiltratiekrat, een hemelwaterput of een gescheiden regenwaternet achteraf aanleggen door een bestaande tuin en oprit kost al snel enkele duizenden euro\'s, en wordt uitgelokt door werken die u misschien al plant. Erger: voldoet het pand niet, dan vervalt de vrijstelling van vergunning voor werken die anders vergunningsvrij waren.',
            fr: 'C\'est le coût le plus sous-estimé d\'un achat en Belgique. Installer après coup un caisson d\'infiltration, une citerne d\'eau de pluie ou un réseau séparé à travers un jardin et une allée existants coûte facilement plusieurs milliers d\'euros, et cela est déclenché par des travaux que vous envisagez peut-être déjà. Pire : si le bien n\'est pas conforme, les travaux normalement dispensés de permis perdent cette dispense.'
        },
        regions: {
            flanders: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'GSV Hemelwater applies since 2 October 2023; drainage inspection required at new build, new connection or forced disconnection',
                    nl: 'GSV Hemelwater geldt sinds 2 oktober 2023; keuring privéwaterafvoer verplicht bij nieuwbouw, nieuwe aansluiting of verplichte afkoppeling',
                    fr: 'Le GSV Hemelwater s\'applique depuis le 2 octobre 2023 ; contrôle de l\'évacuation privée obligatoire en cas de construction neuve, nouveau raccordement ou déconnexion imposée'
                },
                detail: {
                    en: 'The regional rainwater regulation (GSV Hemelwater) has applied since 2 October 2023 to the construction or extension of a house or outbuilding, to a renovation that changes rain or sanitary drainage, to laying or extending a terrace or driveway, to a swimming pool or pond, and to artificial grass and other paving. It requires a rainwater tank of a minimum volume in proportion to the project, maximum reuse of that water where drinking quality is not needed (toilet, cleaning, washing machine, outside use), and an infiltration facility, buffer volume or delayed discharge meeting set requirements. These must be installed and remain in use from the moment the building or paving is taken into use. Crucially, the regulation also applies to works that are exempt from a permit: if the works do not comply, the exemption lapses and a permit becomes necessary. Provinces and municipalities may impose stricter rules, so always ask the commune. Separately, the private drainage inspection (keuring privéwaterafvoer) has been compulsory since 1 July 2011 and was extended on 1 January 2021. It is required for new build or rebuild, for a new house connection or an individual treatment plant (IBA), when a separate sewer is laid in the street and you must disconnect on your own land (unless you already hold a compliant certificate less than 5 years old), and after an infringement at the sewer operator\'s request. The inspector checks that waste water is correctly connected to the public sewer, septic tank or IBA, and that rain and waste water are properly separated on private land. The municipal zoning plan (zoneringsplan) determines what applies at your address, including whether a septic tank is required. A new version of the technical specifications has applied since 12 January 2026. There is no legally fixed price and an inspection typically takes one to three hours.',
                    nl: 'De gewestelijke hemelwaterverordening (GSV Hemelwater) geldt sinds 2 oktober 2023 bij de bouw of uitbreiding van een woning of bijgebouw, bij een renovatie die de afwatering van regen of sanitair wijzigt, bij de aanleg of uitbreiding van een terras of oprit, bij een zwembad of vijver, en bij kunstgras en andere verharding. Ze vereist een hemelwaterput met een minimumvolume in verhouding tot het project, maximaal hergebruik van dat water waar geen drinkwaterkwaliteit nodig is (toiletspoeling, poetswater, wasmachine, buitengebruik), en een infiltratievoorziening, buffervolume of vertraagde afvoer die aan vastgelegde eisen voldoet. Die moeten geplaatst zijn en in gebruik blijven vanaf de ingebruikname van het gebouw of de verharding. Belangrijk: de verordening geldt ook voor vergunningsvrije werken - voldoen die niet, dan vervalt de vrijstelling en is er wél een omgevingsvergunning nodig. Provincies en gemeenten mogen strenger zijn, dus vraag het altijd na bij de gemeente. Daarnaast is de keuring van de privéwaterafvoer verplicht sinds 1 juli 2011 en uitgebreid op 1 januari 2021. Ze is vereist bij nieuwbouw of herbouw, bij een nieuwe huisaansluiting of een individuele zuivering (IBA), bij de aanleg van gescheiden riolering in de straat met afkoppelingsplicht op uw eigen terrein (tenzij u al een conform attest van minder dan 5 jaar oud hebt), en na de vaststelling van een inbreuk op verzoek van de rioolbeheerder. De keurder controleert of het afvalwater correct is aangesloten op de openbare riolering, de septische put of de IBA, en of regen- en afvalwater op privéterrein goed gescheiden zijn. Het gemeentelijke zoneringsplan bepaalt wat op uw adres van toepassing is, ook of een septische put nodig is. Sinds 12 januari 2026 geldt een nieuwe versie van de technische specificaties. Er zijn geen wettelijke richtprijzen en een keuring duurt doorgaans één tot drie uur.',
                    fr: 'Le règlement régional sur l\'eau de pluie (GSV Hemelwater) s\'applique depuis le 2 octobre 2023 à la construction ou l\'extension d\'une habitation ou d\'une annexe, à une rénovation qui modifie l\'évacuation des eaux pluviales ou sanitaires, à l\'aménagement ou l\'extension d\'une terrasse ou d\'une allée, à une piscine ou un étang, ainsi qu\'au gazon artificiel et autres revêtements. Il impose une citerne d\'eau de pluie d\'un volume minimal proportionnel au projet, la réutilisation maximale de cette eau là où la qualité potable n\'est pas requise (chasse, eau de nettoyage, lave-linge, usage extérieur), et un dispositif d\'infiltration, un volume tampon ou une évacuation retardée répondant à des exigences précises. Ils doivent être installés et rester en service dès la mise en usage du bâtiment ou du revêtement. Point essentiel : le règlement s\'applique aussi aux travaux dispensés de permis - s\'ils ne sont pas conformes, la dispense tombe et un permis devient nécessaire. Les provinces et communes peuvent être plus strictes : renseignez-vous toujours auprès de la commune. Par ailleurs, le contrôle de l\'évacuation privée est obligatoire depuis le 1er juillet 2011 et a été étendu le 1er janvier 2021. Il est requis en cas de construction ou reconstruction, de nouveau raccordement ou d\'installation d\'épuration individuelle (IBA), lorsqu\'un égout séparatif est posé dans la rue avec obligation de déconnexion sur votre terrain (sauf si vous disposez déjà d\'une attestation conforme de moins de 5 ans), et après constat d\'infraction à la demande du gestionnaire d\'égouts. Le contrôleur vérifie que les eaux usées sont correctement raccordées à l\'égout public, à la fosse septique ou à l\'IBA, et que l\'eau de pluie et les eaux usées sont bien séparées sur le terrain privé. Le plan de zonage communal détermine ce qui s\'applique à votre adresse, y compris la nécessité d\'une fosse septique. Une nouvelle version des spécifications techniques s\'applique depuis le 12 janvier 2026. Il n\'existe pas de prix légal et un contrôle dure généralement une à trois heures.'
                },
                sources: [
                    { label: 'Gewestelijke stedenbouwkundige verordening Hemelwater', url: 'https://omgeving.vlaanderen.be/nl/verordeningen/de-gewestelijke-hemelwaterverordening-2023' },
                    { label: 'Verplichte keuring privériolering', url: 'https://www.vlaanderen.be/verplichte-keuring-van-priveriolering-voor-afvoer-van-afval-of-regenwater' },
                    { label: 'Keuring afvoer afval- en regenwater (VMM)', url: 'https://vmm.vlaanderen.be/beleid/waterbeleid/riolering-en-waterzuivering/keuring-afvoer-afval-en-regenwater' },
                    { label: 'Groenblauwpeil - bereken uw hemelwatereisen', url: 'https://groenblauwpeil.be/' }
                ]
            },
            wallonia: {
                status: 'unverified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Rainwater and sanitation rules exist but are set by the CoDT, the GPAA and the commune - not confirmed centrally',
                    nl: 'Regels voor hemelwater en sanering bestaan, maar liggen vast in het CoDT, het GPAA en bij de gemeente - niet centraal bevestigd',
                    fr: 'Des règles sur l\'eau de pluie et l\'assainissement existent, fixées par le CoDT, le GPAA et la commune - non confirmées de façon centralisée'
                },
                detail: {
                    en: 'Wallonia has no direct equivalent of the Flemish GSV Hemelwater that we could confirm on an official source. Rainwater tanks and infiltration are commonly imposed through the permit itself and through municipal town planning rules, and sanitation is governed by the "règlement général d\'assainissement" which classifies your address as collective, autonomous or transitory sanitation - that classification decides whether you connect to a sewer or must install an individual treatment unit. Ask the commune for the sanitation regime of the exact address and for any local rainwater rule before you make an offer; do not assume the Flemish figures apply.',
                    nl: 'Wallonië heeft geen rechtstreeks equivalent van de Vlaamse GSV Hemelwater dat we op een officiële bron konden bevestigen. Hemelwaterputten en infiltratie worden meestal opgelegd via de vergunning zelf en via gemeentelijke stedenbouwkundige voorschriften, en de sanering valt onder het "règlement général d\'assainissement" dat uw adres indeelt als collectieve, autonome of overgangssanering - die indeling bepaalt of u aansluit op een riool of zelf een zuiveringseenheid moet plaatsen. Vraag de gemeente naar het saneringsregime van het exacte adres en naar lokale hemelwaterregels vóór u een bod doet; ga er niet van uit dat de Vlaamse cijfers gelden.',
                    fr: 'La Wallonie n\'a pas d\'équivalent direct du GSV Hemelwater flamand que nous ayons pu confirmer sur une source officielle. Les citernes d\'eau de pluie et l\'infiltration sont généralement imposées par le permis lui-même et par les règlements communaux d\'urbanisme, et l\'assainissement relève du règlement général d\'assainissement, qui classe votre adresse en assainissement collectif, autonome ou transitoire - ce classement détermine si vous vous raccordez à l\'égout ou devez installer une unité d\'épuration individuelle. Demandez à la commune le régime d\'assainissement de l\'adresse exacte et les éventuelles règles locales sur l\'eau de pluie avant de faire une offre ; ne supposez pas que les chiffres flamands s\'appliquent.'
                },
                sources: [
                    { label: 'Assainissement des eaux usées (Wallonie)', url: 'https://www.wallonie.be/fr/demarches/assurer-lassainissement-des-eaux-usees-de-son-habitation' }
                ]
            },
            brussels: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Rainwater tank of at least 33 l per m² of roof, and "zero discharge" of rainwater to the sewer',
                    nl: 'Hemelwaterput van minstens 33 l per m² dak, en "nul lozing" van regenwater op de riolering',
                    fr: 'Citerne d\'au moins 33 l par m² de toiture, et « 0 rejet » d\'eau de pluie à l\'égout'
                },
                detail: {
                    en: 'Brussels imposes its rainwater obligations through the environmental permit. They are triggered by a new building or a demolition-reconstruction, by a transformation that increases the ground area by more than 20 m², by works that change how roof water is collected, and by landscaping around an existing building that changes or increases the impermeable surface by more than 20 m². Two duties apply. First, reuse: you must install one or more rainwater tanks able to hold at least 33 litres per m² of roof measured in horizontal projection - about 50 l per m² is advised for bare, non-planted roof surfaces - and connect them to at least one outside tap and one or more toilets. A green roof with a substrate of at least 10 cm and a useful water reserve of at least 8 l per m² does not have to be counted. Second, management on the plot: the target is "zero discharge" of rainwater to the sewer, achieved by reducing impermeable surfaces and by infiltrating and evaporating the rest on your own parcel, typically in shallow planted hollows. A reasonable total drainage time for such a hollow is 24 hours, or up to 72 hours for storage under a permeable surface. Bruxelles Environnement publishes two spreadsheets, the "Calculateur Réutilisation" and the "Calculateur Parcelle", which are normally submitted with the permit application. A derogation is only possible for polluted soil or in protection zone 3 of a water catchment; low soil permeability, a high water table or the presence of a flood zone are explicitly not accepted as reasons. Not respecting the conditions in your environmental permit is an infringement and can be sanctioned.',
                    nl: 'Brussel legt zijn hemelwaterverplichtingen op via de milieuvergunning. Ze worden geactiveerd door een nieuwbouw of een afbraak-heropbouw, door een verbouwing die de grondoppervlakte met meer dan 20 m² vergroot, door werken die de opvang van dakwater wijzigen, en door aanleg rond een bestaand gebouw die de verharde oppervlakte met meer dan 20 m² wijzigt of vergroot. Er gelden twee plichten. Ten eerste hergebruik: u moet één of meer hemelwaterputten plaatsen die minstens 33 liter per m² dakoppervlakte in horizontale projectie kunnen opvangen - voor kale, niet-begroeide dakvlakken wordt ongeveer 50 l per m² aangeraden - en ze aansluiten op minstens één buitenkraan en één of meer toiletten. Een groendak met een substraat van minstens 10 cm en een nuttige waterreserve van minstens 8 l per m² hoeft niet meegeteld te worden. Ten tweede beheer op het perceel: het doel is "nul lozing" van regenwater op de riolering, bereikt door verharding te beperken en de rest op uw eigen perceel te laten infiltreren en verdampen, meestal in ondiepe beplante kommen. Een redelijke totale ledigingstijd voor zo\'n kom is 24 uur, of tot 72 uur voor buffering onder een waterdoorlatende verharding. Leefmilieu Brussel publiceert twee rekenbladen, de "Calculateur Réutilisation" en de "Calculateur Parcelle", die normaal bij de vergunningsaanvraag gaan. Een afwijking is enkel mogelijk bij verontreinigde bodem of in beschermingszone 3 van een waterwinning; een slecht doorlatende bodem, een hoge grondwaterstand of de ligging in overstromingsgebied worden uitdrukkelijk niet aanvaard als reden. De voorwaarden van uw milieuvergunning niet naleven is een inbreuk en kan gesanctioneerd worden.',
                    fr: 'Bruxelles impose ses obligations pluviales via le permis d\'environnement. Elles sont déclenchées par une construction neuve ou une démolition-reconstruction, par une transformation qui augmente la surface au sol de plus de 20 m², par des travaux modifiant la collecte des eaux de toiture, et par un aménagement des abords d\'un bâtiment existant qui modifie ou augmente la surface imperméable de plus de 20 m². Deux devoirs s\'appliquent. D\'abord la réutilisation : vous devez installer une ou plusieurs citernes capables de récupérer au minimum 33 litres par m² de toiture en projection horizontale - environ 50 l par m² étant conseillé pour les pans de toiture « nus », non végétalisés - et les raccorder à au moins un robinet extérieur et un ou plusieurs W.C. Une toiture végétalisée avec un substrat d\'au moins 10 cm et une réserve d\'eau utile d\'au moins 8 l par m² ne doit pas être comptabilisée. Ensuite la gestion à la parcelle : l\'objectif est le « 0 rejet » d\'eau de pluie à l\'égout, atteint en réduisant les surfaces imperméables et en infiltrant et évaporant le reste sur votre propre parcelle, typiquement dans des cuvettes plantées peu profondes. Le temps de vidange total raisonnable d\'une telle cuvette est de 24 h, et jusqu\'à 72 h pour un stockage sous revêtement perméable. Bruxelles Environnement publie deux tableurs, le « Calculateur Réutilisation » et le « Calculateur Parcelle », normalement joints à la demande de permis. Une dérogation n\'est possible qu\'en cas de sol pollué ou en zone 3 de protection de captage ; la faible perméabilité du sol, la proximité de la nappe ou la présence d\'une zone inondable sont explicitement refusées comme motifs. Ne pas respecter les conditions de votre permis d\'environnement constitue une infraction sanctionnable.'
                },
                sources: [
                    { label: 'Gestion des eaux de pluie (Bruxelles Environnement)', url: 'https://environnement.brussels/citoyen/reglementation-et-inspection/obligations-et-autorisations/gestion-des-eaux-de-pluie' },
                    { label: 'Gestion des eaux usées (Bruxelles Environnement)', url: 'https://environnement.brussels/citoyen/reglementation-et-inspection/obligations-et-autorisations/gestion-des-eaux-usees' }
                ]
            }
        }
    },

    permit: {
        icon: 'fa-file-signature',
        title: {
            en: 'Building permit and planning information',
            nl: 'Omgevingsvergunning en stedenbouwkundige inlichtingen',
            fr: 'Permis d\'urbanisme et informations urbanistiques'
        },
        description: {
            en: 'Every structural change, extension, function change or major facade work needs a permit. The municipality keeps the file and issues the planning information for the address.',
            nl: 'Elke structurele wijziging, uitbreiding, functiewijziging of grote gevelwerken vereisen een vergunning. De gemeente houdt het dossier bij en levert de stedenbouwkundige inlichtingen voor het adres.',
            fr: 'Toute modification structurelle, extension, changement d\'affectation ou travaux de façade importants nécessitent un permis. La commune conserve le dossier et délivre les informations urbanistiques de l\'adresse.'
        },
        why: {
            en: 'A building offence does not expire for the owner. If you buy a house with an illegal extension, veranda, extra flat or converted attic, you inherit the enforcement file - a fine, an obligation to restore the original state, or the impossibility of ever getting a permit or a mortgage for it. Always compare the permit drawings with what you actually see on site, and count the number of legally registered housing units.',
            nl: 'Een bouwovertreding verjaart niet voor de eigenaar. Koopt u een huis met een illegale uitbreiding, veranda, extra woning of ingerichte zolder, dan erft u het handhavingsdossier - een boete, een herstelverplichting, of de onmogelijkheid om er ooit een vergunning of hypotheek voor te krijgen. Vergelijk altijd de vergunningsplannen met wat u ter plaatse ziet, en tel het aantal wettelijk geregistreerde woongelegenheden.',
            fr: 'Une infraction urbanistique ne se prescrit pas pour le propriétaire. Si vous achetez une maison avec une extension, une véranda, un logement supplémentaire ou un grenier aménagé sans permis, vous héritez du dossier : amende, obligation de remise en état, ou impossibilité d\'obtenir un permis ou un crédit. Comparez toujours les plans du permis avec ce que vous voyez sur place et comptez le nombre de logements légalement enregistrés.'
        },
        regions: {
            flanders: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Verify before the compromis - an unpermitted building stays your problem',
                    nl: 'Controleer vóór de compromis - een niet-vergund gebouw blijft uw probleem',
                    fr: 'Vérifiez avant le compromis - un bâtiment non autorisé reste votre problème'
                },
                detail: {
                    en: 'Request the "stedenbouwkundige inlichtingen" from the municipality and consult the Omgevingsloket. Much of the file is also visible in your Woningpas. Compare the drawings with the building, and ask explicitly whether there is a known offence on the property.',
                    nl: 'Vraag de stedenbouwkundige inlichtingen op bij de gemeente en raadpleeg het Omgevingsloket. Een groot deel van het dossier is ook zichtbaar in uw Woningpas. Vergelijk de plannen met het gebouw en vraag uitdrukkelijk of er een gekende overtreding op het pand rust.',
                    fr: 'Demandez les informations urbanistiques à la commune et consultez l\'Omgevingsloket. Une grande partie du dossier est aussi visible dans votre Woningpas. Comparez les plans avec le bâtiment et demandez explicitement s\'il existe une infraction connue sur le bien.'
                },
                sources: [
                    { label: 'Omgevingsvergunning (Vlaanderen)', url: 'https://www.vlaanderen.be/omgevingsvergunning' },
                    { label: 'Omgevingsloket', url: 'https://www.omgevingsloketvlaanderen.be/' },
                    { label: 'Woningpas', url: 'https://woningpas.vlaanderen.be/' }
                ]
            },
            wallonia: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Verify with the commune before the compromis',
                    nl: 'Controleer bij de gemeente vóór de compromis',
                    fr: 'Vérifiez auprès de la commune avant le compromis'
                },
                detail: {
                    en: 'In Wallonia the permis d\'urbanisme is requested through the commune. Ask for the urbanistic information on the address and for copies of the permits granted, and compare them with what is actually built.',
                    nl: 'In Wallonië wordt het permis d\'urbanisme aangevraagd via de gemeente. Vraag de stedenbouwkundige informatie over het adres en kopieën van de verleende vergunningen op, en vergelijk ze met wat er effectief gebouwd is.',
                    fr: 'En Wallonie, le permis d\'urbanisme se demande via la commune. Demandez les informations urbanistiques relatives à l\'adresse et les copies des permis délivrés, et comparez-les avec ce qui est réellement bâti.'
                },
                sources: [
                    { label: 'Demander un permis d\'urbanisme (Wallonie)', url: 'https://www.wallonie.be/fr/demarches/demander-un-permis-durbanisme' },
                    { label: 'Géoportail de la Wallonie', url: 'https://geoportail.wallonie.be/' }
                ]
            },
            brussels: {
                status: 'unverified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Verify with the commune and urban.brussels before the compromis',
                    nl: 'Controleer bij de gemeente en urban.brussels vóór de compromis',
                    fr: 'Vérifiez auprès de la commune et d\'urban.brussels avant le compromis'
                },
                detail: {
                    en: 'Brussels permits are handled by the commune and by urban.brussels. We did not verify the exact procedure page at the last review, so ask the commune directly for the planning information and for the permit history of the address.',
                    nl: 'Brusselse vergunningen worden behandeld door de gemeente en door urban.brussels. We hebben de exacte procedurepagina bij de laatste review niet geverifieerd - vraag de gemeente rechtstreeks naar de stedenbouwkundige inlichtingen en de vergunningsgeschiedenis van het adres.',
                    fr: 'Les permis bruxellois sont traités par la commune et par urban.brussels. Nous n\'avons pas vérifié la page de procédure exacte : demandez directement à la commune les informations urbanistiques et l\'historique des permis de l\'adresse.'
                },
                sources: [
                    { label: 'Bruxelles Environnement', url: 'https://environnement.brussels/' },
                    { label: 'Homegrade', url: 'https://homegrade.brussels/' }
                ]
            }
        }
    },

    insurance: {
        icon: 'fa-shield-halved',
        title: {
            en: 'Verzekering Gewaarborgd Wonen (free income protection)',
            nl: 'Verzekering gewaarborgd wonen (gratis inkomensbescherming)',
            fr: 'Assurance logement garanti (protection de revenus gratuite)'
        },
        description: {
            en: 'A free insurance from the Flemish government that helps pay your mortgage instalments if you lose your income through involuntary unemployment, incapacity for work, or the forced end of a self-employed activity.',
            nl: 'Een gratis verzekering van de Vlaamse overheid die helpt bij het aflossen van uw hypothecaire lening als u uw inkomen verliest door onvrijwillige werkloosheid, arbeidsongeschiktheid of gedwongen stopzetting als zelfstandige.',
            fr: 'Une assurance gratuite de la Région flamande qui aide à rembourser votre crédit hypothécaire en cas de perte de revenus : chômage involontaire, incapacité de travail ou cessation forcée d\'une activité indépendante.'
        },
        why: {
            en: 'It costs you nothing and it protects the single biggest financial commitment of your life. Most people never apply simply because they do not know it exists - and the deadline is unforgiving: miss the one-year window and you can no longer apply for that loan. Put the date in your calendar the day your credit is signed.',
            nl: 'Ze kost u niets en beschermt de grootste financiële verbintenis van uw leven. De meeste mensen vragen ze nooit aan omdat ze niet weten dat ze bestaat - en de termijn is genadeloos: mist u het venster van één jaar, dan kunt u voor die lening niet meer aanvragen. Zet de datum in uw agenda zodra uw krediet getekend is.',
            fr: 'Elle ne coûte rien et protège l\'engagement financier le plus important de votre vie. La plupart des gens ne la demandent jamais, faute d\'en connaître l\'existence - et le délai est implacable : passé un an, la demande n\'est plus possible pour ce crédit. Notez la date dans votre agenda dès la signature du crédit.'
        },
        regions: {
            flanders: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Apply within 1 year of the first drawdown of your mortgage',
                    nl: 'Aanvragen binnen 1 jaar na de eerste kapitaalsopname van uw lening',
                    fr: 'Demande dans l\'année suivant le premier prélèvement du crédit'
                },
                detail: {
                    en: 'You apply at the Vlaams Woningfonds within one year after the bank makes (part of) the loan available to you. If you are admitted, you are covered for 10 years from the date your application is received. After a waiting period of 3 months you can receive a contribution towards your instalments for a maximum of 3 years. Conditions apply to the loan, the home and your employment situation.',
                    nl: 'U vraagt de verzekering aan bij het Vlaams Woningfonds binnen het jaar nadat de kredietinstelling (een deel van) het geld ter beschikking stelt. Wordt u toegelaten, dan bent u 10 jaar verzekerd vanaf de datum waarop uw aanvraag ontvangen is. Na een wachttijd van 3 maanden kunt u maximaal 3 jaar een tegemoetkoming krijgen in de aflossing. Er gelden voorwaarden rond de lening, de woning en uw tewerkstelling.',
                    fr: 'La demande se fait auprès du Vlaams Woningfonds dans l\'année qui suit la mise à disposition (même partielle) du crédit. En cas d\'admission, vous êtes couvert pendant 10 ans à partir de la date de réception de la demande. Après un délai d\'attente de 3 mois, une intervention dans les mensualités est possible pendant 3 ans maximum. Des conditions portent sur le crédit, le logement et votre situation professionnelle.'
                },
                sources: [
                    { label: 'Verzekering gewaarborgd wonen', url: 'https://www.vlaanderen.be/verzekering-gewaarborgd-wonen' },
                    { label: 'Guaranteed housing insurance (EN)', url: 'https://www.vlaanderen.be/en/guaranteed-housing-insurance-for-mortgages' },
                    { label: 'Assurance logement garanti (FR)', url: 'https://www.vlaanderen.be/fr/assurance-logement-garanti' }
                ]
            },
            wallonia: {
                status: 'not-applicable',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'This is a Flemish scheme and does not exist in Wallonia',
                    nl: 'Dit is een Vlaamse regeling en bestaat niet in Wallonië',
                    fr: 'Il s\'agit d\'un dispositif flamand, inexistant en Wallonie'
                },
                detail: {
                    en: 'The Verzekering Gewaarborgd Wonen is financed by the Flemish Region for homes located in Flanders. Walloon buyers should look at the housing support offered through the Société wallonne du crédit social and at private payment-protection insurance instead.',
                    nl: 'De verzekering gewaarborgd wonen wordt gefinancierd door het Vlaamse Gewest voor woningen in Vlaanderen. Waalse kopers kijken beter naar de woonondersteuning via de Société wallonne du crédit social en naar private schuldsaldo- of betalingsbeschermingsverzekeringen.',
                    fr: 'L\'assurance logement garanti est financée par la Région flamande pour les logements situés en Flandre. Les acheteurs wallons se tourneront vers les aides au logement de la Société wallonne du crédit social et vers des assurances privées de protection des paiements.'
                },
                sources: [
                    { label: 'Logement Wallonie', url: 'https://logement.wallonie.be/' }
                ]
            },
            brussels: {
                status: 'not-applicable',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'This is a Flemish scheme and does not exist in Brussels',
                    nl: 'Dit is een Vlaamse regeling en bestaat niet in Brussel',
                    fr: 'Il s\'agit d\'un dispositif flamand, inexistant à Bruxelles'
                },
                detail: {
                    en: 'The scheme applies to homes in Flanders. Brussels buyers should check the housing support available through logement.brussels and Homegrade, and consider a private payment-protection policy.',
                    nl: 'De regeling geldt voor woningen in Vlaanderen. Brusselse kopers bekijken best de woonondersteuning via logement.brussels en Homegrade, en overwegen een private betalingsbeschermingspolis.',
                    fr: 'Le dispositif concerne les logements situés en Flandre. Les acheteurs bruxellois consulteront les aides via logement.brussels et Homegrade, et envisageront une assurance privée de protection des paiements.'
                },
                sources: [
                    { label: 'Logement Bruxelles', url: 'https://logement.brussels/' },
                    { label: 'Homegrade', url: 'https://homegrade.brussels/' }
                ]
            }
        }
    },

    flooding: {
        icon: 'fa-water',
        title: {
            en: 'Flood risk',
            nl: 'Overstromingsgevoeligheid',
            fr: 'Risque d\'inondation'
        },
        description: {
            en: 'Every region publishes official flood maps. In Flanders a property gets a P-score for the plot and a G-score for the building, from A (not sensitive) to D (very sensitive), and the seller must mention it in the advertisement and in the deed.',
            nl: 'Elk gewest publiceert officiële overstromingskaarten. In Vlaanderen krijgt een pand een P-score voor het perceel en een G-score voor het gebouw, van A (niet gevoelig) tot D (zeer gevoelig), en de verkoper moet dit vermelden in de advertentie en in de akte.',
            fr: 'Chaque région publie des cartes officielles d\'inondation. En Flandre, un bien reçoit un score P pour la parcelle et un score G pour le bâtiment, de A (non sensible) à D (très sensible), et le vendeur doit le mentionner dans l\'annonce et dans l\'acte.'
        },
        why: {
            en: 'A flood-sensitive address can be difficult or expensive to insure, can lose value, and can be refused for certain permits or extensions. Flood cover is included in Belgian fire insurance, but insurers may apply higher excesses. Even a small flood ruins floors, plaster, electrics and anything stored in the cellar. Check the map yourself - never rely on "it has never flooded here".',
            nl: 'Een overstromingsgevoelig adres kan moeilijk of duur te verzekeren zijn, waarde verliezen en geweigerd worden voor bepaalde vergunningen of uitbreidingen. Overstromingsdekking zit in de Belgische brandverzekering, maar verzekeraars kunnen hogere vrijstellingen toepassen. Zelfs een kleine overstroming vernielt vloeren, pleisterwerk, elektriciteit en alles in de kelder. Controleer de kaart zelf - vertrouw nooit op "hier heeft het nog nooit overstroomd".',
            fr: 'Une adresse sensible aux inondations peut être difficile ou coûteuse à assurer, perdre de la valeur et se voir refuser certains permis ou extensions. La couverture inondation est incluse dans l\'assurance incendie belge, mais les assureurs peuvent appliquer des franchises plus élevées. Même une petite inondation détruit sols, enduits, électricité et tout ce qui est stocké en cave. Consultez la carte vous-même : ne vous fiez jamais à « ici, ça n\'a jamais inondé ».'
        },
        regions: {
            flanders: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Check before you sign the compromis - the seller must disclose the scores',
                    nl: 'Controleer vóór u de compromis tekent - de verkoper moet de scores meedelen',
                    fr: 'Vérifiez avant de signer le compromis - le vendeur doit communiquer les scores'
                },
                detail: {
                    en: 'Use waterinfo.be and the Woningpas to look up the P-score and G-score for the exact address. The watertoets page explains what the scores mean and what the seller has to disclose.',
                    nl: 'Gebruik waterinfo.be en de Woningpas om de P-score en G-score voor het exacte adres op te zoeken. De pagina over de watertoets legt uit wat de scores betekenen en wat de verkoper moet meedelen.',
                    fr: 'Utilisez waterinfo.be et le Woningpas pour rechercher les scores P et G de l\'adresse exacte. La page sur le « watertoets » explique la signification des scores et les obligations du vendeur.'
                },
                sources: [
                    { label: 'Watertoets (Vlaanderen)', url: 'https://www.vlaanderen.be/watertoets' },
                    { label: 'Waterinfo - kaarten', url: 'https://www.waterinfo.be/kaarten' },
                    { label: 'Woningpas', url: 'https://woningpas.vlaanderen.be/' }
                ]
            },
            wallonia: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Check the aléa d\'inondation layer on the Géoportail before you sign',
                    nl: 'Bekijk de laag "aléa d\'inondation" op het Géoportail vóór u tekent',
                    fr: 'Consultez la couche « aléa d\'inondation » sur le Géoportail avant de signer'
                },
                detail: {
                    en: 'The Walloon Géoportail publishes flood hazard and risk mapping per address. Look at both the hazard layer and the historically flooded areas, and remember that a plot next to a small stream can be affected by flash flooding even outside a mapped zone.',
                    nl: 'Het Waalse Géoportail publiceert overstromingsgevaar- en risicokaarten per adres. Bekijk zowel de gevarenlaag als de historisch overstroomde gebieden, en onthoud dat een perceel naast een kleine beek ook buiten een gekarteerde zone getroffen kan worden door plotse overstroming.',
                    fr: 'Le Géoportail wallon publie la cartographie de l\'aléa et du risque d\'inondation par adresse. Consultez la couche d\'aléa et les zones historiquement inondées, et rappelez-vous qu\'une parcelle bordant un petit cours d\'eau peut être touchée par une crue soudaine même hors zone cartographiée.'
                },
                sources: [
                    { label: 'Géoportail de la Wallonie', url: 'https://geoportail.wallonie.be/' }
                ]
            },
            brussels: {
                status: 'verified',
                lastVerified: '2026-07-28',
                deadline: {
                    en: 'Check the Bruxelles Environnement flood mapping before you sign',
                    nl: 'Bekijk de overstromingskaarten van Leefmilieu Brussel vóór u tekent',
                    fr: 'Consultez la cartographie des inondations de Bruxelles Environnement avant de signer'
                },
                detail: {
                    en: 'Bruxelles Environnement publishes flood risk information for the region. Brussels flooding is often caused by saturated sewers and runoff on slopes rather than by a river, so also look at what is uphill from the property.',
                    nl: 'Leefmilieu Brussel publiceert informatie over overstromingsrisico voor het gewest. Brusselse wateroverlast komt vaak door verzadigde riolen en afstroming op hellingen eerder dan door een rivier, dus kijk ook naar wat er hoger ligt dan het pand.',
                    fr: 'Bruxelles Environnement publie les informations sur le risque d\'inondation régional. À Bruxelles, les inondations viennent souvent d\'égouts saturés et du ruissellement sur les pentes plutôt que d\'un cours d\'eau : regardez aussi ce qui se trouve en amont du bien.'
                },
                sources: [
                    { label: 'Bruxelles Environnement', url: 'https://environnement.brussels/' }
                ]
            }
        }
    }
};

/* Advisory (non-legal) topics: practical inspection knowledge, no deadline. */
const ADVISORY_TOPICS = {
    drought: {
        icon: 'fa-house-crack',
        title: {
            en: 'Drought cracks and clay subsidence (plastische gronden)',
            nl: 'Droogteschade en verzakking op plastische gronden',
            fr: 'Fissures de sécheresse et tassement sur sols plastiques'
        },
        when: {
            en: 'Check on any house on clay soil - this problem is growing fast in Belgium',
            nl: 'Controleer bij elke woning op kleigrond - dit probleem groeit snel in België',
            fr: 'À vérifier pour toute maison sur sol argileux - le problème progresse vite en Belgique'
        },
        description: {
            en: 'Look for diagonal cracks running from the corners of windows and doors, cracks wider at the top than at the bottom, doors and windows that no longer close, sloping floors, and gaps opening between the house and a terrace, veranda or extension.',
            nl: 'Let op diagonale scheuren vanaf de hoeken van ramen en deuren, scheuren die bovenaan breder zijn dan onderaan, deuren en ramen die niet meer sluiten, hellende vloeren, en spleten tussen de woning en een terras, veranda of aanbouw.',
            fr: 'Cherchez des fissures diagonales partant des angles des fenêtres et des portes, des fissures plus larges en haut qu\'en bas, des portes et fenêtres qui ne ferment plus, des sols en pente, et des jointures qui s\'ouvrent entre la maison et une terrasse, une véranda ou une annexe.'
        },
        detail: {
            en: 'Large parts of Belgium sit on plastic clay. Clay swells when it takes up water and shrinks when it dries out, and after the recent series of dry summers this movement has been damaging houses whose foundations were never designed for it. The damage is rarely uniform: one corner of the building settles more than the rest, which is exactly why the cracks are diagonal and why they are wider at one end. Trees and large shrubs close to the facade make it much worse, because they pull moisture out of the soil precisely where the foundation sits - a mature tree can remove tens of litres a day in summer. Leaking drains and downpipes discharging next to the foundation do the opposite and cause local swelling. What to do before you buy: check the "plastische gronden" theme portal on Databank Ondergrond Vlaanderen to see whether the address sits on sensitive clay; ask the seller directly whether cracks have been repaired, and look for fresh filler or a single freshly painted strip; measure the widest crack - the Flemish drought damage register only accepts reports of cracks wider than 3 mm or visible tilting, which is a useful severity threshold; and check whether the property has ever been the subject of a stability survey. Note that drought has been recognised as a natural disaster, so fire insurance should cover it, but insurers and owners still dispute which costs are actually included and gradual settlement is often refused as a maintenance issue. If you see this pattern, make your offer conditional on a report from a stability engineer - underpinning a foundation runs into tens of thousands of euros.',
            nl: 'Grote delen van België liggen op plastische klei. Klei zwelt bij wateropname en krimpt bij uitdroging, en na de recente reeks droge zomers beschadigt die beweging woningen waarvan de fundering daar nooit op berekend was. De schade is zelden gelijkmatig: één hoek van het gebouw zakt meer dan de rest, en net daarom lopen de scheuren diagonaal en zijn ze aan één uiteinde breder. Bomen en grote struiken dicht bij de gevel maken het veel erger, omdat ze vocht uit de bodem trekken precies waar de fundering zit - een volgroeide boom onttrekt in de zomer tientallen liters per dag. Lekkende afvoeren en regenpijpen die naast de fundering uitmonden doen het omgekeerde en veroorzaken plaatselijke zwelling. Wat u vóór de aankoop doet: raadpleeg het themaloket "plastische gronden" op Databank Ondergrond Vlaanderen om te zien of het adres op gevoelige klei ligt; vraag de verkoper uitdrukkelijk of er scheuren hersteld zijn, en let op verse plamuur of één vers geschilderde strook; meet de breedste scheur - het Vlaamse registratiepunt droogteschade aanvaardt enkel meldingen van scheuren breder dan 3 mm of zichtbare scheefstelling, wat een bruikbare ernstdrempel is; en ga na of er ooit een stabiliteitsonderzoek is gebeurd. Droogte is intussen erkend als natuurramp, zodat de brandverzekering ze zou moeten dekken, maar verzekeraars en eigenaars betwisten nog altijd welke kosten er precies in zitten en geleidelijke verzakking wordt vaak geweigerd als onderhoudsprobleem. Ziet u dit patroon, maak uw bod dan afhankelijk van een verslag van een stabiliteitsingenieur - een fundering ondervangen loopt in de tienduizenden euro\'s.',
            fr: 'De vastes régions de Belgique reposent sur de l\'argile plastique. L\'argile gonfle lorsqu\'elle absorbe de l\'eau et se rétracte en séchant ; après la série récente d\'étés secs, ce mouvement endommage des maisons dont les fondations n\'ont jamais été conçues pour cela. Les dégâts sont rarement uniformes : un angle du bâtiment tasse plus que le reste, ce qui explique précisément pourquoi les fissures sont diagonales et plus larges à une extrémité. Les arbres et grands arbustes proches de la façade aggravent nettement le phénomène, car ils puisent l\'humidité du sol là même où repose la fondation - un arbre adulte peut prélever des dizaines de litres par jour en été. À l\'inverse, des évacuations qui fuient et des descentes d\'eau débouchant contre la fondation provoquent un gonflement localisé. Que faire avant d\'acheter : consultez le portail thématique « plastische gronden » de la Databank Ondergrond Vlaanderen pour voir si l\'adresse se situe sur une argile sensible ; demandez explicitement au vendeur si des fissures ont été réparées et repérez l\'enduit frais ou une bande fraîchement repeinte ; mesurez la fissure la plus large - le registre flamand des dégâts de sécheresse n\'accepte que les signalements de fissures de plus de 3 mm ou d\'un basculement visible, ce qui constitue un seuil de gravité utile ; et vérifiez si une étude de stabilité a déjà été réalisée. La sécheresse est désormais reconnue comme catastrophe naturelle, de sorte que l\'assurance incendie devrait la couvrir, mais assureurs et propriétaires contestent encore quels coûts sont réellement inclus, et un tassement progressif est souvent refusé comme défaut d\'entretien. Si vous observez ce schéma, conditionnez votre offre à un rapport d\'ingénieur en stabilité - reprendre une fondation en sous-œuvre se chiffre en dizaines de milliers d\'euros.'
        }
    },

    roofridge: {
        icon: 'fa-house-chimney',
        title: {
            en: 'Roof ridge and roof plane (nok / faîte)',
            nl: 'Nok en dakvlak',
            fr: 'Faîte et pan de toiture'
        },
        when: {
            en: 'Look at this from the street before you even go inside',
            nl: 'Bekijk dit vanaf de straat nog vóór u binnengaat',
            fr: 'Observez-le depuis la rue avant même d\'entrer'
        },
        description: {
            en: 'Stand back and sight along the ridge line and along the roof surface, the way a carpenter sights along a plank. The ridge should be dead straight and horizontal, and the roof plane should be flat - not wavy, hollow or bulging.',
            nl: 'Ga achteruit staan en kijk langs de noklijn en langs het dakvlak, zoals een schrijnwerker langs een plank kijkt. De nok hoort kaarsrecht en horizontaal te zijn, en het dakvlak vlak - niet golvend, hol of bol.',
            fr: 'Reculez et visez le long de la ligne de faîte et du pan de toiture, comme un menuisier vise le long d\'une planche. Le faîte doit être parfaitement droit et horizontal, et le pan plat - ni ondulé, ni creux, ni bombé.'
        },
        detail: {
            en: 'A sagging, dipped, wavy or twisted ridge means the roof structure is no longer carrying the load the way it was designed to. The usual causes are: rot or woodworm in the ridge beam, rafters or purlins, often after years of a small leak; an undersized or amateur-modified structure, for example rafters or a truss cut away for a dormer or a roof window without adding support; settlement or spreading of the supporting walls, which usually also shows up as cracks in the gable; too much weight after re-roofing with heavier tiles, or after adding insulation and solar panels; and a broken or corroded connection at the ridge or at the wall plate. A dip near a chimney or a valley almost always means water has been getting in there for a long time. This matters because a roof structure is expensive and disruptive to repair - typically several thousand to tens of thousands of euros once scaffolding is involved - because the same water that rotted the timber has usually also reached the insulation and the ceilings below, and because insurers treat long-term leakage as a maintenance problem rather than a claim. If the ridge is not straight, do not guess: make your offer conditional on a report from a roofer or a stability engineer.',
            nl: 'Een doorzakkende, ingedeukte, golvende of gedraaide nok betekent dat de dakstructuur de last niet meer draagt zoals bedoeld. De gebruikelijke oorzaken zijn: houtrot of houtworm in de nokbalk, kepers of gordingen, vaak na jaren van een klein lek; een te licht gedimensioneerde of amateuristisch gewijzigde structuur, bijvoorbeeld kepers of een spant weggezaagd voor een dakkapel of dakraam zonder bijkomende ondersteuning; verzakking of uitwijking van de dragende muren, wat meestal ook scheuren in de topgevel geeft; te veel gewicht na herdekking met zwaardere pannen, of na het toevoegen van isolatie en zonnepanelen; en een gebroken of weggeroeste verbinding aan de nok of de muurplaat. Een deuk bij een schoorsteen of een kilgoot betekent bijna altijd dat daar al lang water binnendringt. Dit is belangrijk omdat een dakstructuur duur en ingrijpend is om te herstellen - doorgaans enkele duizenden tot tienduizenden euro\'s zodra er stellingen bij komen - omdat hetzelfde water dat het hout deed rotten meestal ook de isolatie en de plafonds eronder bereikte, en omdat verzekeraars langdurige lekkage als een onderhoudsprobleem beschouwen en niet als schadegeval. Is de nok niet recht, gok dan niet: maak uw bod afhankelijk van een verslag van een dakwerker of een stabiliteitsingenieur.',
            fr: 'Un faîte affaissé, creusé, ondulé ou vrillé signifie que la charpente ne reprend plus les charges comme prévu. Les causes habituelles sont : pourriture ou vrillettes dans la panne faîtière, les chevrons ou les pannes, souvent après des années de petite fuite ; une structure sous-dimensionnée ou modifiée par un amateur, par exemple des chevrons ou une ferme coupés pour une lucarne ou une fenêtre de toit sans renfort ; tassement ou écartement des murs porteurs, qui se traduit aussi par des fissures dans le pignon ; un surpoids après recouvrement avec des tuiles plus lourdes, ou après ajout d\'isolation et de panneaux solaires ; et un assemblage rompu ou corrodé au faîte ou à la sablière. Un creux près d\'une cheminée ou d\'une noue signifie presque toujours que l\'eau y pénètre depuis longtemps. C\'est important parce qu\'une charpente coûte cher et est lourde à réparer - généralement plusieurs milliers à plusieurs dizaines de milliers d\'euros dès qu\'il faut un échafaudage - parce que l\'eau qui a pourri le bois a généralement aussi atteint l\'isolation et les plafonds en dessous, et parce que les assureurs considèrent une fuite ancienne comme un défaut d\'entretien et non comme un sinistre. Si le faîte n\'est pas droit, ne devinez pas : conditionnez votre offre à un rapport de couvreur ou d\'ingénieur en stabilité.'
        }
    },

    moisture: {
        icon: 'fa-droplet',
        title: {
            en: 'Rising damp, saltpeter and mould',
            nl: 'Opstijgend vocht, salpeter en schimmel',
            fr: 'Humidité ascensionnelle, salpêtre et moisissures'
        },
        when: {
            en: 'Assess at the viewing - moisture is the most underestimated cost in Belgian homes',
            nl: 'Beoordeel tijdens het bezoek - vocht is de meest onderschatte kost in Belgische woningen',
            fr: 'À évaluer pendant la visite - l\'humidité est le coût le plus sous-estimé du bâti belge'
        },
        description: {
            en: 'Look for white powdery crystals on brickwork, a tide mark up to about a metre above the floor, blistering paint or plaster, bulging skirting boards, black spots in corners and behind furniture, and a musty smell.',
            nl: 'Let op witte poederachtige kristallen op metselwerk, een vochtband tot ongeveer een meter boven de vloer, blaasvormend verfwerk of pleister, bollende plinten, zwarte vlekken in hoeken en achter meubels, en een muffe geur.',
            fr: 'Cherchez des cristaux blancs poudreux sur la maçonnerie, une marque d\'humidité jusqu\'à environ un mètre du sol, une peinture ou un enduit cloqué, des plinthes gonflées, des taches noires dans les angles et derrière les meubles, et une odeur de moisi.'
        },
        detail: {
            en: 'Belgian houses from before roughly 1960 often have no damp-proof course, so groundwater rises through the brick by capillary action and carries salts that destroy plaster and paint from the inside. Persistent damp lowers the insulation value of walls, drives up heating costs, damages the structure and produces mould spores that trigger asthma and allergies. Distinguish the causes, because the fix is completely different: rising damp shows as a tide mark from the floor up; infiltration shows as stains high on the wall, near windows, chimney or gutters; condensation shows as black mould in cold corners, on window reveals and behind cupboards, usually caused by too little ventilation; and a burst pipe shows as one sharply defined wet area. A freshly painted cellar wall, or a single newly plastered strip at the bottom of a wall, is a classic cover-up - bring a moisture meter, they cost less than 30 EUR.',
            nl: 'Belgische woningen van voor ongeveer 1960 hebben vaak geen waterkerende laag, waardoor grondwater door capillaire werking in de baksteen opstijgt en zouten meebrengt die pleister en verf van binnenuit vernielen. Blijvend vocht verlaagt de isolatiewaarde van muren, verhoogt de stookkosten, tast de structuur aan en produceert schimmelsporen die astma en allergieën uitlokken. Onderscheid de oorzaken, want de oplossing verschilt volledig: opstijgend vocht toont zich als een vochtband vanaf de vloer; infiltratie als vlekken hoog op de muur, bij ramen, schoorsteen of goten; condensatie als zwarte schimmel in koude hoeken, op raamdagkanten en achter kasten, meestal door te weinig ventilatie; en een gesprongen leiding als één scherp afgelijnde natte zone. Een vers geschilderde keldermuur, of één opnieuw bepleisterde strook onderaan een muur, is een klassieke doofpot - neem een vochtmeter mee, die kost minder dan 30 EUR.',
            fr: 'Les maisons belges antérieures à 1960 environ n\'ont souvent pas de membrane d\'étanchéité : l\'eau du sol remonte dans la brique par capillarité et transporte des sels qui détruisent l\'enduit et la peinture de l\'intérieur. Une humidité persistante réduit l\'isolation des murs, augmente la facture de chauffage, abîme la structure et produit des spores qui déclenchent asthme et allergies. Distinguez les causes, car le remède diffère totalement : l\'humidité ascensionnelle se voit comme une marque partant du sol ; l\'infiltration comme des taches en hauteur, près des fenêtres, de la cheminée ou des gouttières ; la condensation comme des moisissures noires dans les angles froids, sur les ébrasements et derrière les meubles, généralement par manque de ventilation ; et une conduite percée comme une zone humide nettement délimitée. Un mur de cave fraîchement peint, ou une seule bande ré-enduite en bas d\'un mur, est un camouflage classique - emportez un humidimètre, cela coûte moins de 30 EUR.'
        }
    },

    ventilation: {
        icon: 'fa-fan',
        title: {
            en: 'Ventilation (system A / C / D)',
            nl: 'Ventilatie (systeem A / C / D)',
            fr: 'Ventilation (système A / C / D)'
        },
        when: {
            en: 'Assess before you insulate or replace windows',
            nl: 'Beoordeel vóór u isoleert of ramen vervangt',
            fr: 'À évaluer avant d\'isoler ou de remplacer les fenêtres'
        },
        description: {
            en: 'Belgian homes use system A (natural supply and extract), system C (natural supply, mechanical extract) or system D (mechanical supply and extract with heat recovery). New builds and thorough renovations must have a designed ventilation system.',
            nl: 'Belgische woningen gebruiken systeem A (natuurlijke toevoer en afvoer), systeem C (natuurlijke toevoer, mechanische afvoer) of systeem D (mechanische toevoer en afvoer met warmteterugwinning). Nieuwbouw en ingrijpende renovaties moeten een ontworpen ventilatiesysteem hebben.',
            fr: 'Les logements belges utilisent le système A (amenée et évacuation naturelles), C (amenée naturelle, extraction mécanique) ou D (double flux avec récupération de chaleur). Les constructions neuves et rénovations lourdes doivent disposer d\'un système dimensionné.'
        },
        detail: {
            en: 'A family produces roughly 10 litres of water vapour a day through breathing, showering, cooking and drying laundry. In an airtight, insulated house without ventilation that moisture condenses on the coldest surfaces and you get mould, dust mites and poor air quality within a single winter. This is the classic mistake after an energy renovation: people replace windows and insulate, block every draught, and create a damp house. If you see blocked or taped-over ventilation grilles, ask why - it usually means the occupants were fighting draughts or noise, and the moisture went somewhere else. Hold a sheet of paper against an extract grille: it should stick.',
            nl: 'Een gezin produceert ruwweg 10 liter waterdamp per dag door ademen, douchen, koken en wasgoed drogen. In een luchtdicht geïsoleerd huis zonder ventilatie condenseert dat vocht op de koudste oppervlakken en krijgt u binnen één winter schimmel, huisstofmijt en slechte luchtkwaliteit. Dit is de klassieke fout na een energierenovatie: mensen vervangen ramen en isoleren, dichten elke tocht af, en creëren een vochtig huis. Ziet u afgeplakte of dichtgestopte ventilatieroosters, vraag dan waarom - meestal betekent het dat de bewoners tocht of lawaai bestreden, en dat het vocht ergens anders naartoe ging. Houd een blad papier tegen een afvoerrooster: het hoort te blijven plakken.',
            fr: 'Une famille produit environ 10 litres de vapeur d\'eau par jour en respirant, se douchant, cuisinant et séchant le linge. Dans une maison étanche et isolée sans ventilation, cette humidité se condense sur les surfaces les plus froides : moisissures, acariens et mauvaise qualité de l\'air en un seul hiver. C\'est l\'erreur classique après une rénovation énergétique : on remplace les fenêtres, on isole, on supprime tous les courants d\'air et on obtient une maison humide. Si des grilles de ventilation sont obstruées ou scotchées, demandez pourquoi : cela signifie généralement que les occupants luttaient contre les courants d\'air ou le bruit, et que l\'humidité est partie ailleurs. Placez une feuille de papier contre une grille d\'extraction : elle doit tenir.'
        }
    },

    glazing: {
        icon: 'fa-window-maximize',
        title: {
            en: 'Double and triple glazing',
            nl: 'Dubbele en driedubbele beglazing',
            fr: 'Double et triple vitrage'
        },
        when: {
            en: 'Consider replacement for units older than roughly 20-25 years',
            nl: 'Overweeg vervanging voor eenheden ouder dan ongeveer 20-25 jaar',
            fr: 'Envisagez le remplacement pour des vitrages de plus de 20-25 ans environ'
        },
        description: {
            en: 'Modern high-performance glazing reaches a U-value of 1.1 W/m2K or lower. Double glazing from before 2000 is often 2.8-3.0 W/m2K, which means you are heating the street.',
            nl: 'Moderne hoogrendementsbeglazing haalt een U-waarde van 1,1 W/m2K of lager. Dubbel glas van vóór 2000 zit vaak op 2,8-3,0 W/m2K, wat betekent dat u de straat verwarmt.',
            fr: 'Un vitrage haute performance moderne atteint un coefficient U de 1,1 W/m2K ou moins. Un double vitrage antérieur à 2000 se situe souvent à 2,8-3,0 W/m2K : vous chauffez la rue.'
        },
        detail: {
            en: 'What to look for: condensation or haze BETWEEN the panes means the seal has failed - the insulating gas has escaped and the unit must be replaced, you cannot repair it. Look at the spacer bar between the panes: shiny aluminium is old technology and creates a cold bridge and condensation on the frame, while a grey or black plastic "warm edge" spacer is modern. The code etched in the corner of the pane tells you the type and year. Hold a flame or pen light against the glass: two reflections means single glazing, four means double. Bad glazing does not only cost energy, it also causes cold draughts, mould on the reveals and a worse energy label.',
            nl: 'Waar u op let: condensatie of waas TUSSEN de ruiten betekent dat de dichting het begeven heeft - het isolatiegas is ontsnapt en de eenheid moet vervangen worden, herstellen kan niet. Kijk naar de afstandhouder tussen de ruiten: blinkend aluminium is oude technologie en zorgt voor een koudebrug en condensatie op het raamprofiel, terwijl een grijze of zwarte kunststof "warme rand" modern is. De code in de hoek van de ruit vertelt u het type en het jaar. Houd een vlammetje of zaklamp tegen het glas: twee weerspiegelingen betekent enkel glas, vier betekent dubbel. Slecht glas kost niet alleen energie, het veroorzaakt ook koude tocht, schimmel op de dagkanten en een slechter energielabel.',
            fr: 'Ce qu\'il faut regarder : de la condensation ou un voile ENTRE les vitres signifie que le joint a lâché - le gaz isolant s\'est échappé et l\'unité doit être remplacée, elle ne se répare pas. Regardez l\'intercalaire entre les vitres : un aluminium brillant est une technologie ancienne créant un pont thermique et de la condensation sur le châssis, tandis qu\'un intercalaire plastique gris ou noir « warm edge » est moderne. Le code gravé dans le coin du vitrage indique le type et l\'année. Approchez une flamme ou une lampe : deux reflets signifient simple vitrage, quatre signifient double. Un mauvais vitrage ne coûte pas que de l\'énergie : il provoque aussi des courants d\'air froid, des moisissures sur les ébrasements et un moins bon label énergétique.'
        }
    },

    cadastre: {
        icon: 'fa-map',
        title: {
            en: 'Cadastre (land registry)',
            nl: 'Kadaster',
            fr: 'Cadastre'
        },
        when: {
            en: 'Check before making an offer',
            nl: 'Controleer vóór u een bod doet',
            fr: 'À vérifier avant de faire une offre'
        },
        description: {
            en: 'The cadastre records the exact plot boundaries, the surface area, the building outline and the cadastral income (KI / RC) on which your yearly property tax is based. You can consult the cadastral plan for free through CadGIS and request extracts through MyMinfin.',
            nl: 'Het kadaster registreert de exacte perceelsgrenzen, de oppervlakte, de omtrek van het gebouw en het kadastraal inkomen waarop uw jaarlijkse onroerende voorheffing gebaseerd is. Het kadasterplan raadpleegt u gratis via CadGIS en uittreksels vraagt u via MyMinfin.',
            fr: 'Le cadastre enregistre les limites exactes de la parcelle, la superficie, l\'emprise du bâtiment et le revenu cadastral sur lequel se base votre précompte immobilier annuel. Le plan cadastral se consulte gratuitement via CadGIS et les extraits se demandent via MyMinfin.'
        },
        detail: {
            en: 'Why it matters: the plot on the plan is what you actually buy - garden fences, sheds and driveways are regularly in the wrong place, and a neighbour\'s extension over the boundary becomes your problem. If an extension, veranda or garage does not appear on the cadastral plan it was probably never declared, which can mean an unpermitted building and a tax correction. The cadastral income drives your yearly property tax and is revalued after major works. The plan also reveals servitudes, access rights and shared driveways.',
            nl: 'Waarom dit telt: het perceel op het plan is wat u effectief koopt - tuinafsluitingen, tuinhuizen en opritten liggen regelmatig verkeerd, en de uitbouw van een buur over de grens wordt uw probleem. Staat een uitbreiding, veranda of garage niet op het kadasterplan, dan is ze waarschijnlijk nooit aangegeven, wat kan wijzen op een niet-vergund bouwwerk en een belastingcorrectie. Het kadastraal inkomen bepaalt uw jaarlijkse onroerende voorheffing en wordt herzien na grote werken. Het plan onthult ook erfdienstbaarheden, doorgangsrechten en gedeelde opritten.',
            fr: 'Pourquoi c\'est important : la parcelle figurant au plan est ce que vous achetez réellement - clôtures, abris de jardin et allées sont régulièrement mal placés, et l\'extension d\'un voisin dépassant la limite devient votre problème. Si une extension, une véranda ou un garage n\'apparaît pas au plan cadastral, elle n\'a probablement jamais été déclarée : possible construction non autorisée et correction fiscale. Le revenu cadastral détermine votre précompte immobilier annuel et est révisé après des travaux importants. Le plan révèle aussi les servitudes, droits de passage et allées partagées.'
        }
    },

    syndic: {
        icon: 'fa-building',
        title: {
            en: 'Syndicus, co-ownership and reserve fund',
            nl: 'Syndicus, mede-eigendom en reservefonds',
            fr: 'Syndic, copropriété et fonds de réserve'
        },
        when: {
            en: 'Request the documents before signing the compromis',
            nl: 'Vraag de documenten op vóór u de compromis tekent',
            fr: 'Demandez les documents avant de signer le compromis'
        },
        description: {
            en: 'For an apartment the seller must provide information from the syndicus: the base deed and rules of co-ownership, the minutes of the last general assemblies, the account status, the amount of the reserve and working capital, and any decided or planned works.',
            nl: 'Bij een appartement moet de verkoper informatie van de syndicus bezorgen: de basisakte en het reglement van mede-eigendom, de verslagen van de laatste algemene vergaderingen, de stand van de rekeningen, het bedrag van het reserve- en werkkapitaal, en alle besliste of geplande werken.',
            fr: 'Pour un appartement, le vendeur doit fournir les informations du syndic : l\'acte de base et le règlement de copropriété, les procès-verbaux des dernières assemblées générales, l\'état des comptes, le montant du fonds de réserve et de roulement, et tous les travaux décidés ou planifiés.'
        },
        detail: {
            en: 'When you buy an apartment you also buy a share of the whole building and of its debts. The minutes tell you what is really going on: a decided facade renovation, roof replacement, lift modernisation or new heating plant can mean a bill of 10,000-40,000 EUR per unit, and the decision date - not your purchase date - determines who pays. A reserve fund that is nearly empty in an ageing building means the money will have to come from the owners. Read the last three years of minutes and look for the words "gestemd"/"voté" (voted), "raming"/"estimation" (estimate) and "oproep tot fondsen"/"appel de fonds" (call for funds).',
            nl: 'Wie een appartement koopt, koopt ook een aandeel in het hele gebouw en in zijn schulden. De verslagen tonen wat er echt speelt: een besliste gevelrenovatie, dakvervanging, liftmodernisering of nieuwe stookplaats kan 10.000 tot 40.000 EUR per kavel betekenen, en de datum van de beslissing - niet uw aankoopdatum - bepaalt wie betaalt. Een bijna leeg reservefonds in een verouderend gebouw betekent dat het geld van de eigenaars zal moeten komen. Lees de verslagen van de laatste drie jaar en let op de woorden "gestemd", "raming" en "oproep tot fondsen".',
            fr: 'Acheter un appartement, c\'est aussi acheter une quote-part de tout l\'immeuble et de ses dettes. Les procès-verbaux révèlent la réalité : une rénovation de façade, un remplacement de toiture, une modernisation d\'ascenseur ou une nouvelle chaufferie décidés peuvent représenter 10 000 à 40 000 EUR par lot, et c\'est la date de la décision - pas celle de votre achat - qui détermine qui paie. Un fonds de réserve presque vide dans un immeuble vieillissant signifie que l\'argent viendra des copropriétaires. Lisez les trois dernières années de procès-verbaux et repérez les mots « voté », « estimation » et « appel de fonds ».'
        }
    }
};
