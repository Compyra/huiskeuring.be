/*
 * huiskeuring.be - CHECKLIST CONTENT (English source)
 * ----------------------------------------------------
 * Dutch and French translations live in checklist.nl.js / checklist.fr.js and
 * are keyed by item id (<categorySlug>-<index>). Missing translations fall
 * back to the English text below.
 *
 * Item shape:
 *   {
 *     text:     'What to check'                     (required)
 *     tags:     ['category', ...]                   (required)
 *     why:      'Why it matters / what a problem means'
 *     deadline: 'topicKey'   -> opens the panel for a LEGAL_TOPICS entry (legal.js)
 *     info:     'topicKey'   -> opens the panel for an ADVISORY_TOPICS entry (legal.js)
 *   }
 *
 * Only one of `deadline` / `info` is used per item; both resolve through
 * lookupTopic() in core.js, which checks LEGAL_TOPICS first.
 *
 * IMPORTANT: never reorder or delete items inside a category without bumping
 * SCHEMA_VERSION in core.js - item ids are position based, and the Dutch and
 * French translation files are keyed by those same ids.
 */

const checklistData = [
    {
        category: 'documents',
        title: 'Documents & Certificates (Belgium)',
        icon: 'fa-file-contract',
        items: [
            {
                text: 'Request EPC (Energy Performance Certificate) - mandatory for sale',
                tags: ['documents', 'renovation'],
                deadline: 'epc',
                why: 'The EPC is the only objective, comparable measure of how much energy the home will cost you every year. In Flanders a label E or F also brings a legal renovation obligation to label D within 6 years of the deed, enforceable with fines - so a bad label is a future bill you inherit, and therefore a legitimate reason to negotiate the price.'
            },
            {
                text: 'Check asbestos certificate (asbestattest)',
                tags: ['documents', 'asbestos', 'renovation'],
                deadline: 'asbestos',
                why: 'Mandatory at sale in Flanders for buildings from before 2001. It tells you exactly where asbestos sits and whether it is safely bound. Without it you are buying a health risk and an unknown renovation cost: as soon as you drill, saw or demolish, removal by a certified company becomes obligatory.'
            },
            {
                text: 'Verify electrical installation certificate (keuring elektrische installatie) - valid 25 years',
                tags: ['documents', 'electrical'],
                deadline: 'electrical',
                why: 'A mandatory inspection report at sale. If it says "niet conform" you have 18 months after the deed to fix everything on the list. Read the actual report, not the summary: a full rewire costs thousands, and an unsafe installation is both a fire risk and a reason for an insurer to reduce a payout.'
            },
            {
                text: 'Check soil certificate (bodemattest) - required before the compromis',
                tags: ['documents'],
                deadline: 'soil',
                why: 'The seller must deliver it before the private sale agreement. It reveals whether the plot is a known risk site or has recorded contamination. Remediation can cost more than the house, and old petrol stations, workshops, dry cleaners, farms and buried oil tanks are common causes.'
            },
            {
                text: 'Review conformity certificate for heating/boiler (onderhoudsattest / stookkeuring)',
                tags: ['documents', 'hvac'],
                deadline: 'heating',
                why: 'Periodic servicing is a legal duty (in Flanders: liquid fuel yearly, gas every 2 years). Missing certificates mean carbon-monoxide risk, higher fuel use, and a possible refusal by your fire insurer after an incident. The reports also reveal the true age and condition of the boiler.'
            },
            {
                text: 'Verify building permit for renovations (bouwvergunning / omgevingsvergunning)',
                tags: ['documents', 'renovation'],
                deadline: 'permit',
                why: 'A building offence does not expire for the owner. If a veranda, extension, dormer or extra flat was built without a permit, you inherit the enforcement file - a fine, an order to demolish, and problems getting a mortgage or reselling. Compare the permit drawings with what you actually see.'
            },
            {
                text: 'Check urban planning information (stedenbouwkundige inlichtingen)',
                tags: ['documents'],
                deadline: 'permit',
                why: 'It tells you the zoning of the plot, whether the destination is residential, whether the property is listed, whether there is an alignment plan (a strip that must be given up when the street is widened) or a planned road, and whether there are known offences. This determines what you may ever build there.'
            },
            {
                text: 'Check the flood risk score (overstromingsgevoeligheid, P-score & G-score)',
                tags: ['documents', 'exterior'],
                deadline: 'flooding',
                why: 'The seller must disclose it, but check the official map yourself. A flood-sensitive address can be hard or expensive to insure, loses value, and restricts extensions. One flood destroys floors, plaster, electrics and any equipment in the cellar - never rely on "it has never flooded here".'
            },
            {
                text: 'Request connection certificate for sewage (aansluiting riolering)',
                tags: ['documents', 'plumbing'],
                why: 'It proves that waste water actually goes to the public sewer instead of a septic pit or, worse, a ditch. If the street has a separate system, connecting rainwater and waste water correctly is your obligation - retro-fitting separate drainage in an existing garden easily costs several thousand euros.'
            },
            {
                text: 'Review property cadastral information (kadaster)',
                tags: ['documents'],
                deadline: 'cadastre',
                why: 'The cadastral plan shows what you are really buying: the boundaries, the surface and the registered buildings. A fence or shed in the wrong place, or an extension that never appears on the plan, points to a boundary dispute or an undeclared construction. The cadastral income (KI) also determines your yearly property tax.'
            },
            {
                text: 'Check for registered servitudes or easements (erfdienstbaarheden)',
                tags: ['documents'],
                why: 'A right of way, a shared driveway, a drainage right or a neighbour\'s right to keep a window overlooking your garden travels with the property forever. These rights can block an extension, a fence or a swimming pool, and they are often only visible in the deed - ask the notary explicitly.'
            },
            {
                text: 'Ask about the Verzekering Gewaarborgd Wonen (free income-loss insurance, Flanders)',
                tags: ['documents'],
                deadline: 'insurance',
                why: 'The Flemish government insures you free of charge against losing your income through unemployment, incapacity for work or the forced end of self-employment, and helps pay your mortgage instalments for up to 3 years. You must apply within 1 year of the first drawdown of the loan - most people simply never hear about it and miss the deadline.'
            },
            {
                text: 'Check the Woningpas of the property (Flanders)',
                tags: ['documents'],
                why: 'The Woningpas bundles the official data of a Flemish home - EPC, permits, soil, flood scores, water and subsidies - in one free digital passport. It is the fastest way to cross-check what the seller and the estate agent are telling you.'
            },
            {
                text: 'Verify the number of legally registered housing units',
                tags: ['documents', 'renovation'],
                why: 'Buildings advertised as "ideal for two families" are frequently registered as one unit. Renting out or reselling a non-registered second unit is illegal, banks often refuse to finance the rental income, and regularisation may be impossible under current municipal rules.'
            },
            {
                text: 'Ask for the previous invoices, warranties and technical dossiers of works done',
                tags: ['documents', 'renovation'],
                why: 'Invoices prove who did the work and when, and they keep the ten-year contractor liability (tienjarige aansprakelijkheid) alive for structural work. No invoice usually means DIY work, no warranty, no recourse - and often no permit either.'
            }
        ]
    },
    {
        category: 'asbestos',
        title: 'Asbestos Detection (Asbest)',
        icon: 'fa-exclamation-triangle',
        items: [
            {
                text: 'Check roof for asbestos (golfplaten/eterniet)',
                tags: ['asbestos', 'exterior', 'renovation'],
                deadline: 'asbestos',
                why: 'Corrugated fibre-cement sheets on roofs, garages and lean-tos are the single most common asbestos application in Belgium. Weathered sheets release fibres, and rain washes them into the soil below. They cannot be pressure-washed, drilled or broken - only removed by a certified company.'
            },
            {
                text: 'Inspect ceiling panels and soffits for asbestos (especially pre-2001)',
                tags: ['asbestos', 'structural', 'renovation'],
                why: 'Soft ceiling tiles, boiler-room linings and soffit boards can contain loosely bound asbestos, which is far more dangerous than bonded cement because fibres release with the slightest damage. Any renovation of the ceiling turns this into a specialised, expensive job.'
            },
            {
                text: 'Check old floor tiles and floor glue (vloertegels, zwarte lijm) for asbestos',
                tags: ['asbestos', 'renovation'],
                why: 'Vinyl tiles from the 1960s-1980s and the black bitumen glue underneath frequently contain asbestos. It is harmless while covered, but sanding or ripping it out releases fibres - which is exactly what most buyers do in their first renovation week.'
            },
            {
                text: 'Inspect insulation around pipes, boilers and flues',
                tags: ['asbestos', 'plumbing', 'renovation'],
                why: 'Old pipe lagging and boiler jackets often contain loose asbestos, the most hazardous form. Damaged lagging in a cellar contaminates the whole space, and the dust travels through the house on shoes and clothing.'
            },
            {
                text: 'Check window sills, ventilation ducts and flue pipes for asbestos cement',
                tags: ['asbestos', 'exterior', 'renovation'],
                why: 'Grey fibre-cement sills, ventilation shafts and chimney flue liners are easy to overlook, yet each one becomes a certified-removal job the moment you replace windows or install a new boiler flue.'
            },
            {
                text: 'Inspect old electrical panels and fuse boards for asbestos backing',
                tags: ['asbestos', 'electrical', 'renovation'],
                why: 'Pre-1980 fuse boards were often mounted on asbestos boards for fire resistance. If you are already planning to renew the installation, this needs to be in the same quotation instead of becoming an unpleasant surprise mid-job.'
            },
            {
                text: 'Check garage, shed and carport roofing materials',
                tags: ['asbestos', 'exterior'],
                why: 'Outbuildings are where the cheapest materials went, and where asbestos most often survives. It also matters for your garden: broken sheets contaminate the soil underneath, which then becomes a soil-remediation issue.'
            },
            {
                text: 'Verify the removal plan if asbestos is found - certified company required',
                tags: ['asbestos', 'renovation'],
                deadline: 'asbestos',
                why: 'Removal is strictly regulated. Doing it yourself, or letting an uncertified contractor do it, is illegal, uninsurable and contaminates your home. Ask for a written quotation including containment, disposal and a clearance certificate.'
            },
            {
                text: 'Budget for asbestos removal (roughly 20-100 EUR/m2 plus replacement)',
                tags: ['asbestos', 'renovation'],
                why: 'Costs vary enormously with accessibility, the type of asbestos and whether scaffolding or containment is needed. Getting one real quotation before you bid turns a frightening unknown into a concrete number you can negotiate with.'
            }
        ]
    },
    {
        category: 'exterior',
        title: 'Exterior Inspection',
        icon: 'fa-building',
        items: [
            {
                text: 'Sight along the roof ridge (nok) and roof plane - is it perfectly straight?',
                tags: ['structural', 'exterior', 'renovation'],
                deadline: 'roofridge',
                why: 'Stand back and look along the ridge like a carpenter sighting a plank. A dip, sag, wave or twist means the structure is no longer carrying its load: rot or woodworm in the ridge beam and rafters (usually after years of a small leak), rafters cut away for a dormer or Velux without added support, spreading or settling walls, or extra weight from heavier tiles, insulation or solar panels. A dip near a chimney or valley almost always means long-term water ingress. Roof structure repairs run from a few thousand to tens of thousands of euros with scaffolding, and insurers treat slow leaks as maintenance, not a claim - so make your offer conditional on a roofer\'s or stability engineer\'s report.'
            },
            {
                text: 'Check the pitched roof covering: missing, slipped, cracked or moss-covered tiles',
                tags: ['exterior', 'structural', 'renovation'],
                why: 'A single displaced tile lets water reach the underlay and the timber. Heavy moss holds moisture against the tiles and accelerates frost damage. Look for patches of different colour - a repaired area usually marks where a leak once was, and where the timber underneath may already be soft.'
            },
            {
                text: 'Check flat roof (plat dak) condition - very common in Belgium',
                tags: ['structural', 'exterior', 'renovation'],
                why: 'Flat roofs have a limited service life (roughly 20-30 years for EPDM, less for older bitumen). Blisters, cracks, shrinkage at the upstands and ponding water are the warning signs. A failed flat roof does not drip politely in one place - water travels along the deck and appears metres away, so damage is usually widespread by the time you see it.'
            },
            {
                text: 'Inspect the EPDM or bitumen membrane, seams and upstands',
                tags: ['exterior', 'renovation'],
                why: 'Most flat-roof leaks start at a detail, not in the middle: a seam, a corner, the upstand against a wall, or the collar around a pipe. Lifted or brittle edges and visible mastic repairs indicate a roof at the end of its life rather than a small defect.'
            },
            {
                text: 'Check lichtkoepels (roof domes/skylights) - minimum 15 cm upstand above insulation',
                tags: ['exterior', 'renovation'],
                why: 'A dome sitting too low lets driving rain and melting snow run over the upstand and straight into the roof build-up. It also becomes a cold bridge that drips condensation onto the ceiling below. If you later insulate the flat roof from the outside, the upstand must be raised - a cost people forget to budget.'
            },
            {
                text: 'Verify flat roof drainage (waterafvoer) - no standing water 48 h after rain',
                tags: ['exterior', 'plumbing'],
                why: 'Standing water adds weight, accelerates ageing of the membrane, grows algae and freezes in winter, prying the seams open. Ponding usually means the deck has sagged - which points back to the structure, not just the covering. Also check that there is an emergency overflow.'
            },
            {
                text: 'Inspect gevel (facade) for cracks, bulges or displaced brickwork',
                tags: ['structural', 'exterior'],
                why: 'Hairline cracks in the mortar are normal ageing. Stepped cracks following the joints, cracks wider than about 2 mm, cracks that widen towards the top or bottom, or a facade that bulges outward point to foundation settlement or a failed cavity tie - a structural problem that needs an engineer, not a tube of filler.'
            },
            {
                text: 'Check voegwerk (pointing/mortar joints) condition',
                tags: ['exterior', 'structural'],
                why: 'When joints become soft, sandy or hollow, wind-driven rain penetrates the brick and the wall stays permanently damp: higher heating bills, frost damage and interior mould. Repointing an average facade is a scaffolded job of roughly 40-80 EUR/m2, so a whole facade is a real budget item.'
            },
            {
                text: 'Inspect goten en regenpijpen (gutters and downspouts) and where they discharge',
                tags: ['exterior', 'plumbing'],
                why: 'A leaking or overflowing gutter soaks the same strip of facade year after year and is the classic hidden cause of damp walls, rotten fascia boards and a wet cellar. Check for rust, sagging, plant growth, and whether the downpipe actually connects to a drain instead of ending on the ground next to the foundation.'
            },
            {
                text: 'Examine buitenmuren for moisture, tide marks or saltpeter (salpeter)',
                tags: ['structural', 'exterior'],
                deadline: 'moisture',
                why: 'White crystalline deposits and a damp band near ground level indicate rising damp - common in Belgian houses built before a damp-proof course became standard. It destroys plaster and paint, chills the wall, raises heating costs and feeds mould. A freshly painted strip at the bottom of a wall is a classic cover-up.'
            },
            {
                text: 'Check windows and doors (PVC, wood, aluminium) for sealing and operation',
                tags: ['exterior', 'renovation'],
                why: 'Open and close every one. Doors and windows that jam, or that need lifting to lock, often indicate the frame is out of square - which can mean settlement rather than a worn hinge. Perished rubber seals, rotten timber at the bottom rail and failed mastic joints let in water and draughts.'
            },
            {
                text: 'Verify double or triple glazing (dubbel/driedubbel glas) and its age',
                tags: ['exterior', 'renovation'],
                info: 'glazing',
                why: 'Condensation between the panes means the seal has failed and the unit must be replaced - it cannot be repaired. Shiny aluminium spacers indicate old technology with a cold edge and condensation on the frame. Poor glazing costs energy, causes draughts and mould on the reveals, and drags the EPC label down.'
            },
            {
                text: 'Check for cavity wall insulation (spouwmuurisolatie) and cavity condition',
                tags: ['exterior', 'renovation'],
                why: 'An uninsulated cavity is one of the cheapest energy wins available (drill-and-fill), but only if the cavity is clean, wide enough and free of mortar droppings and damp. Look for the tell-tale grid of filled drill holes to see whether it has already been done - and ask for the certificate, because badly injected insulation causes damp bridges.'
            },
            {
                text: 'Check the foundation and plinth for cracks, water damage or missing damp-proof course',
                tags: ['structural', 'exterior', 'basement'],
                why: 'The plinth is where the ground meets the wall and where rising damp starts. Look for a visible damp-proof membrane, and for soil, terrace paving or a raised garden bed piled ABOVE that level - a very common and easily missed cause of chronically wet walls.'
            },
            {
                text: 'Inspect bricks (baksteen) for frost damage (vorstschade) and flaking faces',
                tags: ['exterior', 'structural'],
                why: 'Flaking, crumbling brick faces mean water is being absorbed and then freezing inside the brick. It gets worse every winter, it exposes the softer core of the brick to further damage, and it usually indicates an underlying moisture problem such as a leaking gutter or failed pointing.'
            },
            {
                text: 'Check for adequate drainage and ground level around the foundation',
                tags: ['exterior', 'plumbing'],
                why: 'Ground and paving should slope AWAY from the house. When a terrace, driveway or garden is higher than the damp-proof course, rain runs towards the wall and into the structure - a very cheap thing to check and an expensive thing to discover later.'
            },
            {
                text: 'Verify terrace/balcony (terras/balkon) waterproofing and slope',
                tags: ['exterior'],
                why: 'A balcony over a living space is a roof. If the slope, the waterproofing or the edge detail is wrong, water enters the slab, corrodes the reinforcement and causes concrete spalling - one of the more expensive repairs on an apartment building, and often a shared cost.'
            },
            {
                text: 'Inspect chimney (schoorsteen) - render, flashing, lead work and cap',
                tags: ['exterior', 'structural'],
                why: 'The chimney is the most exposed part of the building and the most common leak point. Cracked render, open joints and failed lead flashing let water into the stack, where it travels down inside the wall and appears as a stain on a bedroom ceiling that looks nothing like a roof leak.'
            },
            {
                text: 'Check dormers (dakkapellen) and roof windows for correct flashing',
                tags: ['exterior', 'structural', 'renovation'],
                why: 'Dormers and Velux windows are cut into the roof structure, so they are both a common leak point and a common place where rafters were cut without proper trimming. Damp stains in the attic around them tell you both stories at once.'
            },
            {
                text: 'Check the garden: trees near the building, boundary walls and shared fences',
                tags: ['exterior', 'structural'],
                why: 'Large trees close to a facade can affect the foundation through soil shrinkage in clay and through root pressure, and they fill your gutters every autumn. Boundary walls, hedges and fences are a classic source of neighbour disputes - find out who owns and maintains them before you buy, not after.'
            },
            {
                text: 'Check for a rainwater tank (regenwaterput) and its capacity and pump',
                tags: ['exterior', 'plumbing', 'renovation'],
                why: 'A rainwater tank is often mandatory for new builds and thorough renovations, and it lowers your water bill. Verify it is actually connected to toilets and outside taps, that the pump works, and that the overflow discharges legally - many tanks are installed and then never plumbed in.'
            }
        ]
    },
    {
        category: 'kitchen',
        title: 'Kitchen Inspection (Keuken)',
        icon: 'fa-utensils',
        items: [
            {
                text: 'Test all appliances (oven, kookplaat, vaatwasser, koelkast)',
                tags: ['kitchen', 'electrical'],
                why: 'Built-in appliances are usually included in the sale and are usually the oldest thing in the kitchen. Replacing an integrated oven, hob and dishwasher easily costs 1,500-3,000 EUR, and a non-standard size can force you to replace a whole cabinet run.'
            },
            {
                text: 'Check if a gas connection is present (gasaansluiting) and certified',
                tags: ['kitchen', 'hvac'],
                why: 'Gas connections must be leak-tight and the room adequately ventilated. Flexible hoses have an expiry date printed on them. If you plan to switch to induction, remember it needs a dedicated heavy circuit - and possibly a heavier main supply.'
            },
            {
                text: 'Verify the kitchen has its own dedicated power circuit(s)',
                tags: ['kitchen', 'electrical'],
                why: 'Kitchens draw the highest continuous load in a house. Running an oven, dishwasher and kettle from one old circuit trips the breaker constantly and overheats the wiring. In older houses the whole floor is often on a single 16 A circuit - a rewiring cost you want to know about in advance.'
            },
            {
                text: 'Check keukenblad (countertop) material, joints and condition around the sink',
                tags: ['kitchen'],
                why: 'Swollen, dark or soft chipboard at the sink cut-out means water has been getting in for a long time. It is the first place a kitchen fails, and it usually means the sink seal and possibly the cabinet underneath need replacing too.'
            },
            {
                text: 'Inspect under the sink for leaks, stains or water damage',
                tags: ['kitchen', 'plumbing'],
                why: 'Open the cupboard and feel the base. Rippled panels, a musty smell or a suspiciously new base panel indicates a slow leak. Slow leaks rot the floor and can reach the joists below, which turns a 50 EUR trap into a floor repair.'
            },
            {
                text: 'Verify adequate extraction (afzuigkap/dampkap) and that it vents outside',
                tags: ['kitchen', 'hvac', 'renovation'],
                why: 'A recirculating hood with a charcoal filter removes smell but not moisture, so all the water vapour from cooking stays in the house and condenses somewhere colder. Ducting a hood to the outside afterwards means cutting through a wall or roof, so check it before you commit.'
            },
            {
                text: 'Test all electrical outlets - splash-proof types required near the sink',
                tags: ['kitchen', 'electrical'],
                why: 'Sockets too close to a sink or hob are both a legal infraction and a genuine electrocution risk. They will also appear on the electrical inspection report, so they become your obligation to correct.'
            },
            {
                text: 'Check tegels (tiles), grout and silicone joints - floor and wall',
                tags: ['kitchen'],
                why: 'Cracked grout and black silicone let water behind the tiles, where it soaks the plaster and the substrate. Tapping tiles that sound hollow means they have already lost their bond - the repair is much bigger than it looks.'
            },
            {
                text: 'Inspect cabinets (keukenkasten), hinges and drawer runners',
                tags: ['kitchen'],
                why: 'Doors that no longer line up, sagging shelves and swollen carcass edges show the kitchen is near the end of its life. A full replacement kitchen is typically 5,000-20,000 EUR, so this materially affects what the property is worth to you.'
            },
            {
                text: 'Verify adequate lighting above work surfaces',
                tags: ['kitchen', 'electrical'],
                why: 'A single ceiling light means you always work in your own shadow, which is genuinely unsafe when using knives and hot pans. Adding under-cabinet lighting later means new cabling in a finished wall.'
            },
            {
                text: 'Check the washing machine / dishwasher position: water inlet, drain and waterproof floor',
                tags: ['kitchen', 'plumbing', 'renovation'],
                why: 'An appliance on an upper floor without a waterproof tray or a floor drain will eventually flood the ceiling below. Verify the drain height is correct and that there is a shut-off valve you can actually reach.'
            },
            {
                text: 'Inspect aanrecht (sink), kraan (tap) and water pressure',
                tags: ['kitchen', 'plumbing'],
                why: 'Weak flow can mean a blocked aerator, but it can equally mean furred-up or undersized pipework, or an old lead supply. Run the hot tap and time how long it takes - a very long wait means the boiler is far away or undersized.'
            },
            {
                text: 'Check whether the kitchen layout can be changed without moving drains',
                tags: ['kitchen', 'renovation'],
                why: 'Moving a sink or dishwasher a few metres requires a new waste run with the correct fall. In a concrete floor that means breaking up the slab. Knowing this up front is the difference between a 2,000 EUR facelift and a 15,000 EUR renovation.'
            }
        ]
    },
    {
        category: 'bathroom',
        title: 'Bathroom Inspection (Badkamer)',
        icon: 'fa-bath',
        items: [
            {
                text: 'Test the toilet (WC) flush and check for leaks at the base',
                tags: ['bathroom', 'plumbing'],
                why: 'A continuously running cistern quietly wastes thousands of litres a year. Water or a dark ring around the base means the seal has failed and water has been reaching the floor structure - a common cause of rotten joists in older houses.'
            },
            {
                text: 'Check douche (shower) water pressure, flow and temperature stability',
                tags: ['bathroom', 'plumbing'],
                why: 'Run the shower and then open another tap. A big pressure or temperature swing points to undersized pipework or an underpowered boiler - annoying every single day and expensive to fix once the walls are tiled.'
            },
            {
                text: 'Inspect shower and bath drainage speed',
                tags: ['bathroom', 'plumbing', 'renovation'],
                why: 'Slow drainage means a partial blockage, an insufficient fall on the waste pipe, or an undersized drain. Standing water in a shower tray means the tray or the floor has settled, which is a bigger job than a plunger.'
            },
            {
                text: 'Verify waterproofing (waterdichte laag) under and behind the tiles',
                tags: ['bathroom', 'renovation'],
                why: 'Tiles and grout are not waterproof; the membrane behind them is. Belgian bathrooms from before roughly 2000 often have none. Once water gets behind the tiles it soaks the screed, rots the floor and appears as a stain on the ceiling below - and the only real fix is to strip the bathroom.'
            },
            {
                text: 'Check for mechanical ventilation and that it actually extracts',
                tags: ['bathroom', 'hvac', 'renovation'],
                deadline: 'ventilation',
                why: 'Hold a sheet of paper against the grille: it should stick. A bathroom without working extraction produces litres of vapour per shower, which condenses on cold surfaces and creates black mould within one winter - a health issue as much as a cosmetic one.'
            },
            {
                text: 'Inspect tegels (tiles), voegen (grout) and silicone for cracks and mould',
                tags: ['bathroom'],
                why: 'Black or crumbling silicone at the bath and shower edges is the number one entry point for water. Hollow-sounding tiles have lost their bond. These are cheap to fix now and very expensive to fix after the floor below is damaged.'
            },
            {
                text: 'Test wastafel (basin), kraan (tap) and the waste trap underneath',
                tags: ['bathroom', 'plumbing'],
                why: 'Fill the basin and let it drain fully while you look underneath - many leaks only show at full flow. A missing or dried-out trap also lets sewer smells into the room.'
            },
            {
                text: 'Verify electrical sockets and fittings respect the wet-zone rules',
                tags: ['bathroom', 'electrical'],
                why: 'Belgian regulations define protection volumes around the bath and shower. Sockets or switches inside those zones are dangerous and will be flagged on the electrical inspection report, making correction your legal obligation after purchase.'
            },
            {
                text: 'Check lighting is suitable for wet areas (adequate IP rating near the shower)',
                tags: ['bathroom', 'electrical'],
                why: 'Ordinary fittings corrode in a bathroom and can become live. Rusty screws or condensation inside a light fitting are visible warning signs that the wrong product was used.'
            },
            {
                text: 'Inspect the floor for the correct slope towards the drain',
                tags: ['bathroom', 'renovation'],
                why: 'If water pools instead of running to the drain, the screed is wrong. In a walk-in shower that means permanently wet grout, mould and eventually water reaching the structure - and correcting a slope means removing the floor.'
            },
            {
                text: 'Look for schimmel (mould), peeling paint and moisture damage on walls and ceiling',
                tags: ['bathroom', 'plumbing'],
                deadline: 'moisture',
                why: 'Mould in corners and on the ceiling is a ventilation problem; stains on one specific spot are a leak. The distinction matters: one is fixed with a fan, the other with a plumber. Mould spores also aggravate asthma and allergies, so it is a health issue, not just a stain.'
            },
            {
                text: 'Check heated towel rail (handdoekdroger) and radiator operation',
                tags: ['bathroom', 'hvac', 'electrical'],
                why: 'A cold bathroom stays damp for hours after a shower, which is exactly how mould gets established. A rail that stays cold at the top usually just needs bleeding, but one that stays cold entirely may be disconnected from the circuit.'
            },
            {
                text: 'Verify drain pipes and shut-off valves are accessible for maintenance',
                tags: ['bathroom', 'plumbing', 'renovation'],
                why: 'Pipes buried behind tiles with no inspection hatch mean that any future leak turns into demolition. Also locate the local shut-off valve - if the only valve is the main one for the whole house, a burst flexible hose becomes a much bigger event.'
            }
        ]
    },
    {
        category: 'bedroom',
        title: 'Bedroom Inspection (Slaapkamer)',
        icon: 'fa-bed',
        items: [
            {
                text: 'Check all stopcontacten (sockets) - number, position and earthing',
                tags: ['bedroom', 'electrical'],
                why: 'Two sockets per bedroom means extension leads everywhere, which is both impractical and a fire risk. Unearthed sockets in a room point to old wiring throughout the house, so treat it as a signal rather than a detail.'
            },
            {
                text: 'Test lichtschakelaars (light switches) and fixtures',
                tags: ['bedroom', 'electrical'],
                why: 'Flickering, buzzing or warm switches indicate loose connections - a genuine fire risk in older installations. Also check whether there is a two-way switch at the door and at the bed; adding one later means chasing a wall.'
            },
            {
                text: 'Inspect kast (closet) space and door operation',
                tags: ['bedroom'],
                why: 'A built-in wardrobe against an uninsulated external wall traps still, cold air and is a classic place to find mould behind it. Pull it away from the wall if you can and look.'
            },
            {
                text: 'Check ramen (windows) for operation, sealing and ventilation grilles',
                tags: ['bedroom', 'exterior'],
                why: 'Bedrooms need controlled fresh air: two adults exhale roughly a litre of water vapour overnight. A window that cannot open, or a taped-over grille, means that moisture stays in the room and lands on the coldest wall.'
            },
            {
                text: 'Examine walls for scheuren (cracks), stains or damp patches',
                tags: ['bedroom', 'structural'],
                why: 'Cracks that run diagonally from window and door corners are settlement indicators. Damp patches on an external wall behind furniture usually mean condensation from poor insulation, not a leak - but both need to be understood before you decorate.'
            },
            {
                text: 'Inspect vloer (flooring) condition - parket, laminaat, tapijt',
                tags: ['bedroom'],
                why: 'Springy or sloping floors point to joist problems; a strong smell from old carpet often hides pet damage or damp underneath. Lift a corner where you can - what is under the covering matters more than the covering.'
            },
            {
                text: 'Check plafond (ceiling) for stains, sagging or fresh paint patches',
                tags: ['bedroom'],
                why: 'A brown-edged stain is a water mark; a single freshly painted patch on an otherwise old ceiling usually means someone covered one up. Ask directly what caused it and when it was repaired.'
            },
            {
                text: 'Test verwarming (heating) in the room - radiator or floor heating',
                tags: ['bedroom', 'hvac'],
                why: 'A radiator that is cold at the bottom is sludged; cold at the top just needs bleeding. A room with no heat source at all is a real problem for both comfort and housing-quality standards, and adding a radiator means extending pipework.'
            },
            {
                text: 'Verify rookmelder (smoke detector) presence, position and date',
                tags: ['bedroom', 'electrical'],
                deadline: 'smokedetector',
                why: 'Mandatory in Flanders on every level of the home. Detectors expire (usually after 10 years - the date is printed on the housing) and an expired detector counts as no detector. Press the test button while you are there.'
            },
            {
                text: 'Check for adequate ventilation (ventilatieroosters) and whether they are blocked',
                tags: ['bedroom', 'hvac'],
                deadline: 'ventilation',
                why: 'Taped, painted over or stuffed grilles are a strong hint that the occupants had a draught or noise problem - and that the moisture had nowhere to go. That moisture is now somewhere in the construction.'
            },
            {
                text: 'Check sound insulation from the street, neighbours and stairs',
                tags: ['bedroom', 'structural'],
                why: 'Noise is the thing buyers most regret after moving in and the hardest thing to fix. Stand still in silence during the viewing, and if possible come back once in the evening and once at rush hour.'
            }
        ]
    },
    {
        category: 'livingroom',
        title: 'Living Room / Salon Inspection (Woonkamer)',
        icon: 'fa-couch',
        items: [
            {
                text: 'Check all stopcontacten (sockets) - count, spread and earthing',
                tags: ['livingroom', 'electrical'],
                why: 'A living room needs sockets on several walls; older Belgian rooms often have two. Retro-fitting sockets means chasing plaster and redecorating, so count them now and price the work into your offer.'
            },
            {
                text: 'Test lichtschakelaars (light switches) and fixtures',
                tags: ['livingroom', 'electrical'],
                why: 'Buzzing or warm switches indicate loose connections and are a fire risk. Also check whether lighting circuits are switched sensibly - awkward switching is a daily irritation and expensive to change afterwards.'
            },
            {
                text: 'Inspect open haard / kachel (fireplace or stove) and its flue certificate',
                tags: ['livingroom', 'structural', 'hvac'],
                why: 'An unlined or cracked flue can leak carbon monoxide into the room and is a serious fire risk. Ask when the chimney was last swept and whether the appliance has a conformity certificate; without it your fire insurance can be contested.'
            },
            {
                text: 'Check ramen (windows), glazing type and orientation',
                tags: ['livingroom', 'exterior'],
                info: 'glazing',
                why: 'Large single-glazed or old double-glazed windows dominate the heating bill and the comfort of the room. South and west-facing glass also causes serious overheating in summer if there is no shading - increasingly relevant in Belgium.'
            },
            {
                text: 'Examine muren (walls) for scheuren (cracks) or bulging',
                tags: ['livingroom', 'structural'],
                why: 'Cracks near a chimney breast, an opening or where an old wall was removed can indicate that a load-bearing element was altered without a proper beam. That is a structural engineer question, not a decorating one.'
            },
            {
                text: 'Inspect vloer condition (parket, tegels, laminaat) and levelness',
                tags: ['livingroom'],
                why: 'Put a ball or a spirit level on the floor. A noticeable slope, springiness or gaps opening between boards points to joist or foundation movement rather than a worn surface.'
            },
            {
                text: 'Check ceiling height and room proportions for habitability',
                tags: ['livingroom', 'structural'],
                why: 'Minimum ceiling heights apply for a room to count as habitable living space under housing-quality standards. It also determines whether you can ever add floor insulation or a suspended ceiling without making the room feel oppressive.'
            },
            {
                text: 'Test verwarming (heating) - radiators or floor heating',
                tags: ['livingroom', 'hvac'],
                why: 'Feel every radiator top and bottom. Undersized radiators in the biggest room mean the house will never feel warm on cold days, and upgrading them may also require a bigger boiler or larger pipes.'
            },
            {
                text: 'Verify internet, TV and network connections and the available speed at the address',
                tags: ['livingroom', 'electrical'],
                why: 'Fibre coverage in Belgium is very uneven street by street. Check the actual available technology and speed for the exact address before you buy - working from home with a slow connection is a daily problem you cannot renovate away.'
            },
            {
                text: 'Check natural light, orientation and overshadowing',
                tags: ['livingroom'],
                why: 'A north-facing living room with a high neighbouring building will need artificial light all day and will always feel cold. Note the compass orientation and the time of your viewing - a 10 a.m. visit tells you nothing about the evening.'
            },
            {
                text: 'Look for signs that a wall was removed or an opening enlarged',
                tags: ['livingroom', 'structural', 'renovation'],
                why: 'Open-plan living rooms in older Belgian houses were often created by removing a load-bearing wall. If it was done without a properly sized beam and permit, you will see cracks above the opening and sagging ceilings - and you inherit the liability.'
            }
        ]
    },
    {
        category: 'basement',
        title: 'Basement/Cellar Inspection (Kelder)',
        icon: 'fa-dungeon',
        items: [
            {
                text: 'Check for vocht (moisture) or active water infiltration',
                tags: ['basement', 'plumbing', 'structural', 'renovation'],
                deadline: 'moisture',
                why: 'The cellar is the honest part of the house: whatever the ground is doing shows here first. Water marks at a consistent height indicate periodic flooding; wet patches on one wall indicate infiltration from outside. Interior cellar waterproofing (kelderafdichting) typically costs several thousand euros and is not always a permanent fix.'
            },
            {
                text: 'Inspect for witte uitslag (saltpeter / efflorescence) on walls',
                tags: ['basement', 'structural'],
                why: 'Those white crystals are salts carried out of the brick by evaporating water. They prove that moisture is actively moving through the wall, and they slowly destroy plaster and mortar. Brushing them off does nothing about the cause.'
            },
            {
                text: 'Notice the smell - a musty cellar smell means persistent damp',
                tags: ['basement'],
                why: 'Your nose is a good moisture meter. A strong earthy or musty smell means humidity is high enough for mould to grow, even if the walls look dry, and that smell will travel up into the house through the stairwell.'
            },
            {
                text: 'Check whether the basement is legally suitable for habitation',
                tags: ['basement', 'renovation'],
                why: 'Converting a cellar into a bedroom or office requires minimum ceiling height, daylight, escape routes and ventilation, and usually a permit. Many "extra rooms" advertised in cellars do not comply, which affects both insurance and resale.'
            },
            {
                text: 'Measure ceiling height for future use',
                tags: ['basement', 'renovation'],
                why: 'If you later add floor insulation and a screed you lose 10-15 cm, and a tanking system on the walls takes more. Measure before you plan - many cellar conversions fail on height alone.'
            },
            {
                text: 'Inspect foundation walls for cracks, bowing or displaced brick',
                tags: ['basement', 'structural'],
                why: 'Horizontal cracks or a wall bulging inwards indicate soil pressure and are far more serious than vertical shrinkage cracks. This is one of the few findings that should stop a purchase until an engineer has looked at it.'
            },
            {
                text: 'Check whether the walls have been waterproofed and how',
                tags: ['basement', 'renovation'],
                why: 'Fresh render, a shiny sealer coat or new studwork in an old cellar often hides a damp problem rather than solving it. Sealing the inside can even push moisture higher up the wall. Ask for the invoice and the guarantee.'
            },
            {
                text: 'Verify the drainage system and any sump pump',
                tags: ['basement', 'plumbing', 'renovation'],
                why: 'If the cellar relies on a pump to stay dry, you need to know: pumps fail, and they fail during the storm when you need them. Check that it works, that there is an alarm or a backup, and ask how often it actually runs.'
            },
            {
                text: 'Look for schimmel (mould) or mildew on walls, timber and stored items',
                tags: ['basement'],
                why: 'Mould in the cellar means the humidity is chronically high. Spores travel upward through the house and aggravate asthma and allergies. It also indicates that any timber down there - joists, stairs, door frames - is at risk of rot.'
            },
            {
                text: 'Check insulation and pipe lagging if the cellar is heated or below living space',
                tags: ['basement', 'hvac', 'renovation'],
                why: 'An uninsulated cellar ceiling makes the ground floor permanently cold and pushes up heating costs. It is usually one of the cheapest and most effective insulation jobs in an existing house - if the cellar is dry.'
            },
            {
                text: 'Inspect the floor - concrete condition, cracks and any sealing',
                tags: ['basement', 'renovation'],
                why: 'Older cellars often have no floor slab at all, just compacted earth or a thin screed, so ground moisture evaporates directly into the room. Damp coming through the floor cannot be fixed by treating the walls.'
            },
            {
                text: 'Verify ventilation openings exist and are not blocked',
                tags: ['basement', 'hvac', 'renovation'],
                deadline: 'ventilation',
                why: 'Cellar vents are frequently bricked up or blocked by a terrace built later. Without air movement the humidity stays high permanently, and any insulation added afterwards will trap moisture in the structure.'
            },
            {
                text: 'Check stookplaats (boiler room) access, ventilation and fuel storage',
                tags: ['basement', 'hvac'],
                why: 'A combustion appliance needs a permanent air supply; blocking that vent to stop draughts is a carbon-monoxide risk. Also check whether an old heating-oil tank is present - abandoned tanks must be emptied, cleaned and certified, and a leaking one is a soil-contamination case.'
            },
            {
                text: 'Verify the electrical installation in the cellar meets current standards',
                tags: ['basement', 'electrical'],
                why: 'Cellars are damp environments where old, uninsulated or improvised wiring is common and genuinely dangerous. This is also where the meter and consumer unit usually live, so it tells you the state of the whole installation.'
            }
        ]
    },
    {
        category: 'attic',
        title: 'Attic/Roof Space Inspection (Zolder)',
        icon: 'fa-house-damage',
        items: [
            {
                text: 'Check dakisolatie (roof insulation) - presence, type and thickness',
                tags: ['attic', 'hvac', 'renovation'],
                why: 'Roof insulation is the single biggest heat-loss saving in a Belgian house and the cheapest way to improve the EPC label. Note the thickness (typically 20-30 cm of mineral wool is needed today) and whether there is a vapour barrier on the warm side - insulation without one causes condensation inside the roof.'
            },
            {
                text: 'Look for daylight, water stains and dark streaks on the underside of the roof',
                tags: ['attic', 'structural'],
                why: 'Go up on a bright day and turn the light off. Pinpoints of daylight mean missing tiles or a torn underlay. Dark streaks running down the rafters trace exactly where water has been travelling, which tells you where to look on the outside.'
            },
            {
                text: 'Inspect dakstructuur (rafters, purlins, ridge beam) for sagging or deflection',
                tags: ['attic', 'structural'],
                deadline: 'roofridge',
                why: 'This is the inside view of the ridge line you checked from the street. Look for rafters that bow, joints that have opened, props added by a previous owner, and timber that has been cut for a dormer or Velux without a proper trimmer. Amateur alterations to a roof structure are common and can be dangerous.'
            },
            {
                text: 'Look for signs of houtworm (woodworm), rot or fungal growth',
                tags: ['attic', 'structural'],
                why: 'Small round exit holes with fine dust below mean active infestation; soft, crumbly or fibrous timber means rot, which is always a moisture problem first. Press a screwdriver into suspect timber - if it sinks in, the wood has lost its strength. Treatment plus timber replacement is a serious cost.'
            },
            {
                text: 'Check whether the floor structure can carry a living-space load',
                tags: ['attic', 'structural', 'renovation'],
                why: 'Ceiling joists are usually sized only to carry a ceiling and light storage, not people and furniture. Converting an attic often requires strengthening or replacing the floor - a structural engineer\'s job, and one of the biggest hidden costs of a conversion.'
            },
            {
                text: 'Verify headroom (stahoogte) and usable floor area for a conversion',
                tags: ['attic', 'renovation'],
                why: 'Habitable-room rules require a minimum height over a minimum proportion of the floor. Measure at the ridge and at the point where the slope reaches 1.5 m - that is the surface you can really use, and it is usually much smaller than it looks.'
            },
            {
                text: 'Check whether zolder conversion is legally possible (permit, daylight, escape route)',
                tags: ['attic', 'renovation'],
                deadline: 'permit',
                why: 'An attic bedroom needs a permit, adequate daylight, ventilation and an escape route. Buying a house "because you can always convert the attic" without checking these rules is one of the most expensive assumptions a buyer can make.'
            },
            {
                text: 'Check ventilation of the roof space and above the insulation',
                tags: ['attic', 'hvac', 'renovation'],
                deadline: 'ventilation',
                why: 'A cold roof needs an air gap above the insulation so moisture from the house can escape. Blocking it - by stuffing insulation tight against the underlay - causes condensation, wet insulation and rot in the rafters, often within two or three winters.'
            },
            {
                text: 'Inspect the electrical wiring in the attic',
                tags: ['attic', 'electrical', 'renovation'],
                why: 'Attic wiring is usually the oldest in the house and is frequently buried under later insulation, where cables overheat. Cloth-covered or brittle cable here is a strong indicator that the whole installation needs renewing.'
            },
            {
                text: 'Verify chimney condition from inside the roof space',
                tags: ['attic', 'structural'],
                why: 'From the attic you can see whether the stack is cracked, whether the mortar is crumbling, and whether there are damp stains around it. Chimneys are the most common leak point, and staining here explains ceiling marks in the rooms below.'
            },
            {
                text: 'Check whether extra roof windows or a dormer can be added',
                tags: ['attic', 'renovation'],
                deadline: 'permit',
                why: 'Roof windows are often permit-exempt while dormers usually are not, and municipal rules on visible roof planes vary. This determines whether the attic can ever become a proper room, so verify it with the municipality rather than with the estate agent.'
            },
            {
                text: 'Check for bird, wasp, rodent or marten activity',
                tags: ['attic'],
                why: 'Droppings, nests, gnawed insulation and chewed cables are common in Belgian attics. Beyond the mess, martens and rodents damage electrical cables and insulation, and their entry points are the same gaps that let water in.'
            }
        ]
    },
    {
        category: 'plumbing',
        title: 'Water & Plumbing Systems (Sanitair)',
        icon: 'fa-tint',
        items: [
            {
                text: 'Locate and operate the hoofdkraan (main water shut-off valve)',
                tags: ['plumbing'],
                why: 'On the day a flexible hose bursts you have seconds, not minutes. Old valves seize open and snap when you finally need them. Find it, check it turns, and make sure it is reachable without moving furniture.'
            },
            {
                text: 'Test waterdruk (water pressure) - roughly 2-4 bar is normal',
                tags: ['plumbing', 'kitchen', 'bathroom'],
                why: 'Too low means weak showers and appliances that fill slowly; too high (above about 5 bar) stresses seals, flexible hoses and the boiler and causes water hammer. A pressure gauge on an outside tap costs about 10 EUR and answers the question immediately.'
            },
            {
                text: 'Inspect leidingen (pipes) - identify any lead supply pipework',
                tags: ['plumbing', 'renovation'],
                why: 'Lead pipes are dull grey, soft enough to scratch with a coin and give a dull sound when tapped. Lead dissolves into drinking water and is a serious health risk for children and pregnant women. Replacement is not optional - budget for it and use it in negotiation.'
            },
            {
                text: 'Check the pipe material used throughout (copper, PVC, multilayer, galvanised steel)',
                tags: ['plumbing'],
                why: 'Galvanised steel pipes fur up internally and eventually restrict flow to a trickle; mixing copper directly with steel causes galvanic corrosion. Knowing the material tells you the remaining life of the system, not just its current behaviour.'
            },
            {
                text: 'Verify boiler / water heater age, type and capacity',
                tags: ['plumbing', 'basement'],
                why: 'Read the data plate: the year is usually in the serial number. Water heaters last roughly 10-15 years, and an undersized one means running out of hot water with two showers. Replacement is a 1,500-4,000 EUR item you want to anticipate.'
            },
            {
                text: 'Check whether a condensing boiler (condensatieketel) is installed and how the condensate drains',
                tags: ['plumbing', 'hvac', 'renovation'],
                why: 'Condensing boilers are far more efficient but need a condensate drain and a suitable flue. If a previous owner fitted one without a proper drain, the acidic condensate has been attacking something. It also matters for whether you can upgrade later.'
            },
            {
                text: 'Test hot water recovery time and temperature at the furthest tap',
                tags: ['plumbing'],
                why: 'A long wait for hot water wastes litres every single day and points to uninsulated or badly routed pipework. Water stored below about 60 C also carries a legionella risk in larger systems.'
            },
            {
                text: 'Inspect riolering (sewer/drainage) connection, inspection chambers and any septic tank',
                tags: ['plumbing'],
                why: 'Lift the inspection chamber lid if you can. Standing water or sludge means a partial blockage or a collapsed pipe - a repair that involves digging up the garden or driveway. If there is a septic tank, ask when it was last emptied and whether the street has a sewer at all.'
            },
            {
                text: 'Check for a separated system (gescheiden rioleringsstelsel) for rain and waste water',
                tags: ['plumbing', 'renovation'],
                why: 'Municipalities increasingly require rainwater and waste water to be separated, and connect it to the obligation when you renovate. Retro-fitting a separate rainwater network through an existing garden is disruptive and typically costs several thousand euros.'
            },
            {
                text: 'Verify where rainwater actually goes (infiltration, tank, sewer or the neighbour)',
                tags: ['plumbing', 'exterior'],
                why: 'Downpipes discharging next to the foundation are a leading cause of damp walls and wet cellars. Rainwater deliberately routed onto a neighbouring plot is also a classic legal dispute. Follow the pipes with your eyes - it takes two minutes.'
            },
            {
                text: 'Check for correct fall on visible waste pipes',
                tags: ['plumbing', 'renovation'],
                why: 'Waste pipes need a consistent slope. Too flat and solids settle and block; too steep and the water outruns the solids with the same result. Recurrent blockages in a house usually mean an installation fault, not bad luck.'
            },
            {
                text: 'Look for water stains (vochtplekken) on walls and ceilings throughout the house',
                tags: ['plumbing', 'structural'],
                deadline: 'moisture',
                why: 'Map every stain and ask what is directly above it. A stain under a bathroom is a plumbing leak; a stain under a roof valley or chimney is water ingress; a stain at the base of a wall is rising damp. Fresh paint on only one part of a ceiling is a warning sign.'
            },
            {
                text: 'Test all kranen (taps) for drips, and check the isolation valves',
                tags: ['plumbing'],
                why: 'A dripping tap is trivial in itself, but a house full of them shows the level of maintenance you can expect elsewhere. Missing isolation valves mean every small repair requires shutting off the whole house.'
            },
            {
                text: 'Check the water meter, and whether it turns with everything closed',
                tags: ['plumbing'],
                why: 'Close every tap and watch the meter for five minutes. Any movement means a hidden leak somewhere in the property - possibly under a floor or in a wall, where it may already have been causing damage for months.'
            },
            {
                text: 'Verify whether a regenwatertank (rainwater tank) is present, connected and functional',
                tags: ['plumbing', 'exterior'],
                why: 'A tank that exists but was never connected to toilets and outside taps saves nothing. Check the pump, the filter and the mains backup - and never connect rainwater to the drinking-water network, which is illegal and dangerous.'
            },
            {
                text: 'Ask for the keuringsattest privéwaterafvoer (private drainage inspection certificate)',
                tags: ['plumbing', 'documents'],
                deadline: 'water',
                why: 'In Flanders this inspection is compulsory for a new build or rebuild, for a new connection or an individual treatment plant, and when the street gets a separate sewer and you must disconnect on your own land. The certificate proves rain and waste water are correctly separated and connected. If it is missing or says "not compliant", the correction is yours to pay for, and a certificate older than 5 years no longer exempts you when a forced disconnection comes.'
            },
            {
                text: 'Locate the infiltratievoorziening: infiltratieput, infiltratiekrat or wadi',
                tags: ['plumbing', 'exterior'],
                deadline: 'water',
                why: 'Since October 2023 the Flemish rainwater regulation requires rainwater to infiltrate on your own plot, through an infiltration well, buried crates or a shallow planted hollow. Ask to see where it is and whether it still works - crates silt up and stop draining. If there is none and you plan a terrace, driveway, extension or pool, you will have to install one, and retro-fitting through a finished garden is the expensive way to do it.'
            },
            {
                text: 'Check for a bezinkput / zandvang (settling pit) before the infiltration or sewer',
                tags: ['plumbing', 'exterior'],
                why: 'A settling pit catches sand, leaves and grit before they reach the infiltration facility or the sewer. If nobody has emptied it in years it is full, and everything downstream of it - the crates, the soakaway, the connection - is silting up too. Lift the lid: it should be mostly water, not mud.'
            },
            {
                text: 'Ask the commune for the zoneringsplan: sewer, IBA or septic tank at this address',
                tags: ['plumbing', 'documents'],
                deadline: 'water',
                why: 'The municipal zoning plan decides whether the property connects to the public sewer or must treat its own waste water with an individual plant (IBA), and whether a septic tank is required. Buying a house in an area where a sewer will never arrive means an IBA is your responsibility, which is a four-figure installation plus ongoing maintenance.'
            }
        ]
    },
    {
        category: 'electrical',
        title: 'Electrical Systems (Elektriciteit)',
        icon: 'fa-bolt',
        items: [
            {
                text: 'Verify elektrische keuring (inspection report) is present, valid and read it in full',
                tags: ['electrical', 'documents'],
                deadline: 'electrical',
                why: 'Mandatory at sale, valid 25 years. A "niet conform" report gives you 18 months after the deed to correct everything listed. Read the infractions themselves - they range from a missing cover plate to an installation that needs complete replacement, and the difference is thousands of euros.'
            },
            {
                text: 'Inspect verdeelkast (consumer unit / fuse box) - type, age and labelling',
                tags: ['electrical', 'basement'],
                why: 'Ceramic screw fuses, a wooden backboard or a rat\'s nest of unlabelled cables means the installation is decades old and almost certainly non-compliant. A modern, well-labelled board with proper breakers is one of the best signs of a maintained house.'
            },
            {
                text: 'Check the main supply capacity and whether it suits your plans',
                tags: ['electrical', 'renovation'],
                why: 'Induction cooking, a heat pump, an EV charger and solar panels each need capacity. Upgrading the connection, and possibly moving to three-phase, is a Fluvius job with a real cost and a waiting time - check before you plan an all-electric renovation.'
            },
            {
                text: 'Verify the aardlekschakelaar / differentieelschakelaar (RCD) is present and test it',
                tags: ['electrical'],
                why: 'The RCD is what stops an electric shock from killing you. Press the test button: it should trip instantly. A missing, taped-down or non-functioning RCD is one of the most dangerous defects a home can have.'
            },
            {
                text: 'Check for an additional high-sensitivity RCD covering wet rooms',
                tags: ['electrical', 'bathroom', 'kitchen'],
                why: 'Bathrooms and kitchens require extra protection because water dramatically lowers the body\'s resistance. This is a standard requirement in the Belgian regulations and a standard item on inspection reports.'
            },
            {
                text: 'Test stopcontacten (sockets) - earthing, polarity and secure fixing',
                tags: ['electrical'],
                why: 'A socket tester costs about 15 EUR and checks every socket in minutes. Unearthed sockets mean appliance metalwork can become live. Loose sockets that move when you pull a plug indicate poor fixing and possibly loose conductors behind them.'
            },
            {
                text: 'Verify there are enough circuits and sockets per room',
                tags: ['electrical', 'renovation'],
                why: 'Old Belgian installations often run a whole floor from one circuit. That trips constantly with modern loads and heats the cable. Adding circuits means work at the board and new cable runs through finished walls.'
            },
            {
                text: 'Check whether old two-pin, unearthed outlets are still in use',
                tags: ['electrical', 'renovation'],
                why: 'Unearthed outlets almost always mean there is no earth conductor in that part of the installation, so it cannot be fixed by swapping the socket. It usually signals a rewire of at least that circuit and often the whole house.'
            },
            {
                text: 'Inspect visible bedrading (wiring) - no cloth-covered or brittle cable',
                tags: ['electrical', 'renovation'],
                why: 'Rubber and cloth insulation from before roughly 1970 becomes brittle and crumbles when disturbed, exposing live conductors. Find it in the cellar or attic and you have found the real age of the installation, whatever the seller says.'
            },
            {
                text: 'Test all lichtschakelaars (light switches) and look for improvised junctions',
                tags: ['electrical'],
                why: 'Junction boxes hidden behind furniture, taped joints or connectors lying loose in a ceiling void are fire risks and a sign of DIY work. If you can see improvisation where it is visible, assume worse where it is not.'
            },
            {
                text: 'Check deurbel, intercom and any alarm or camera system',
                tags: ['electrical'],
                why: 'These are small, but they reveal whether wiring was extended properly or improvised. For an apartment, a broken intercom is a shared-cost item that involves the syndicus.'
            },
            {
                text: 'Verify rookmelders (smoke detectors) on every level and their expiry dates',
                tags: ['electrical'],
                deadline: 'smokedetector',
                why: 'Legally required in Flanders on every storey. Detectors expire, typically after 10 years, and an expired unit gives no protection. This is also part of the housing-quality standards, which matters if you ever rent the property out.'
            },
            {
                text: 'Check for a CO-melder (carbon monoxide detector) where there is any combustion appliance',
                tags: ['electrical', 'hvac'],
                why: 'Carbon monoxide is colourless and odourless and still kills people in Belgium every winter. Any gas, oil, wood or coal appliance justifies a detector - they cost about 30 EUR and are the cheapest life-safety item in the house.'
            },
            {
                text: 'Check equipotentiaalverbinding (equipotential bonding), especially in the bathroom',
                tags: ['electrical', 'bathroom'],
                why: 'Bonding ties all metal parts to the same potential so a fault cannot create a lethal voltage difference between a tap and a radiator. It is a standard inspection point and its absence is a common reason for a non-compliant report.'
            },
            {
                text: 'Check the meter type, and whether there is a digital meter and solar installation',
                tags: ['electrical', 'renovation'],
                why: 'A digital meter, an existing PV installation and its inverter age all affect your future bills and the value of the solar panels. Ask for the installation certificates and the inverter\'s age - inverters typically last 10-15 years, panels much longer.'
            }
        ]
    },
    {
        category: 'structural',
        title: 'Structural Elements (Structuur)',
        icon: 'fa-hard-hat',
        items: [
            {
                text: 'Check muren (walls) for scheuren (cracks), bulging or leaning',
                tags: ['structural'],
                why: 'Not all cracks matter, but the pattern does. Fine, stable hairline cracks in plaster are normal. Diagonal or stepped cracks through brickwork, cracks wider than about 2 mm, cracks that pass through a lintel, or a wall that is visibly out of plumb indicate movement that needs an engineer.'
            },
            {
                text: 'Inspect cracking around windows and doors - a settlement indicator',
                tags: ['structural'],
                why: 'Openings are the weakest points of a wall, so settlement shows there first. Diagonal cracks running away from the corners of several openings on the same side of the house point at foundation movement rather than at plaster shrinkage.'
            },
            {
                text: 'Identify which walls are dragende muren (load-bearing)',
                tags: ['structural', 'renovation'],
                why: 'This decides whether your open-plan dream is a weekend job or a 15,000 EUR engineered steel beam with a permit. Knock on the wall, look at the direction of the floor joists, and check the plans - and never take the estate agent\'s word for it.'
            },
            {
                text: 'Check whether previous alterations were done with a stability engineer and permit',
                tags: ['structural', 'renovation'],
                why: 'Removed walls, enlarged openings and cut roof timbers done without calculations are common and dangerous. Ask for the stability study and the permit. Without them you inherit both the risk and the liability, and your insurer may decline a claim.'
            },
            {
                text: 'Inspect vloeren (floors) for levelness, bounce and squeaks',
                tags: ['structural'],
                why: 'A ball that rolls, doors that swing open by themselves and floors that bounce when you walk indicate joist deflection, rot at the bearing ends, or foundation settlement. Test at the middle of the span, not next to the wall.'
            },
            {
                text: 'Verify floor load capacity for your intended use',
                tags: ['structural', 'renovation'],
                why: 'Heavy tiled floors, a large aquarium, a home gym, a bath or a green roof all add significant load. Older timber floors were not designed for them, and finding out afterwards means opening the ceiling below.'
            },
            {
                text: 'Check houten balken (wooden beams) for rot, woodworm and the bearing ends in the wall',
                tags: ['structural'],
                why: 'Timber beams almost always fail where they sit in the outside wall, because that is where moisture collects and where you cannot see. Look for damp staining on the wall below the beam ends, and press a screwdriver into any suspect timber.'
            },
            {
                text: 'Inspect plafonds (ceilings) for cracks, sagging or bulging plaster',
                tags: ['structural'],
                why: 'A sagging ceiling can mean the plaster has lost its key to the lath (common in older houses and a falling hazard), a leak above, or overloaded joists. Push gently upward - if it moves, it is already detached.'
            },
            {
                text: 'Verify ceiling heights meet habitable-room standards',
                tags: ['structural', 'renovation'],
                why: 'Housing-quality standards set minimum heights for habitable rooms. Below them a room cannot legally count as a bedroom or living space, which affects rental, insurance and resale - and adding floor insulation later reduces the height further.'
            },
            {
                text: 'Check deurkozijnen (door frames) and windows for squareness',
                tags: ['structural'],
                why: 'Put a spirit level on a few frames and try each door. Frames out of square across the whole house, especially on one side, are a cheap and reliable indicator of settlement that is easy to check during a viewing.'
            },
            {
                text: 'Inspect trap (stairs), treads and leuningen (handrails) for stability',
                tags: ['structural'],
                why: 'Stairs are the most common place for serious accidents at home. Loose treads, a wobbling handrail, uneven risers or a missing balustrade are both a safety issue and a housing-quality infraction.'
            },
            {
                text: 'Check staircase dimensions and headroom',
                tags: ['structural', 'renovation'],
                why: 'Steep, narrow staircases with high risers are common in older Belgian townhouses. Replacing one to meet current standards eats floor area on both levels, so it is a much bigger job than it looks - and it also decides whether you can get furniture upstairs.'
            },
            {
                text: 'Look for signs of verzakking (settlement) - sloping floors, uneven thresholds, gaps',
                tags: ['structural', 'basement'],
                why: 'Settlement shows as a combination of clues rather than one crack: sloping floors, gaps opening between skirting and floor, doors that bind on one side, and cracks that all lean the same way. Together they justify a structural survey before you commit.'
            },
            {
                text: 'Identify the fundering (foundation) type and condition where visible',
                tags: ['structural', 'basement'],
                why: 'Older Belgian houses often sit on shallow brick footings without a damp-proof course. That is not automatically a problem, but it explains rising damp and it changes what is possible if you want to extend, underpin or dig out a cellar.'
            },
            {
                text: 'Check support beams, columns and any props added by a previous owner',
                tags: ['structural', 'basement'],
                why: 'An adjustable steel prop left in place "temporarily" in a cellar is a sign that someone knew there was a problem. Corroded steel beam ends built into damp brickwork are another classic - they expand as they rust and crack the wall around them.'
            },
            {
                text: 'Check whether the property shares walls with neighbours (gemene muur) and their condition',
                tags: ['structural', 'renovation'],
                why: 'In Belgian terraced housing the party wall is jointly owned, and works on it involve your neighbour legally and financially. A leaning or cracked party wall, or a neighbouring building that is derelict, becomes your problem too.'
            },
            {
                text: 'Measure the widest crack and look for the diagonal pattern of drought damage',
                tags: ['structural', 'exterior'],
                info: 'drought',
                why: 'After a run of dry summers, clay soils shrinking under foundations have become one of the fastest-growing damage causes in Belgium. The tell-tale pattern is diagonal cracks from the corners of window and door openings, wider at one end. Take a photo with a coin or a ruler next to the crack: above 3 mm it is officially significant, and it is worth a stability survey before you sign.'
            },
            {
                text: 'Check whether the address sits on plastische gronden (swelling clay)',
                tags: ['structural', 'documents'],
                info: 'drought',
                why: 'Databank Ondergrond Vlaanderen publishes a free map showing where the subsoil is sensitive to swelling and shrinking clay. It takes a minute to look up the address and it tells you whether the cracks you are looking at have a plausible cause - and whether the risk is still there for the extension you were planning.'
            },
            {
                text: 'Note large trees close to the facade and ask when they were planted or felled',
                tags: ['structural', 'exterior'],
                info: 'drought',
                why: 'A mature tree can draw tens of litres of water a day out of the soil in summer, shrinking clay right where the foundation sits. Felling a large tree can be just as damaging: the soil slowly takes water back up and swells again. Both show up as cracks years later, so the history matters.'
            }
        ]
    },
    {
        category: 'hvac',
        title: 'HVAC & Heating Systems (Verwarming & Ventilatie)',
        icon: 'fa-fan',
        items: [
            {
                text: 'Check verwarmingsketel (boiler) age, brand and condition',
                tags: ['hvac', 'basement'],
                deadline: 'heating',
                why: 'Read the data plate. A boiler older than 15-20 years is at the end of its life and spare parts get scarce. Replacement, or a switch to a heat pump, is typically a 5,000-15,000 EUR item - one of the largest single costs after purchase, and a legitimate negotiation point.'
            },
            {
                text: 'Verify whether it is a condensing boiler (condensatieketel)',
                tags: ['hvac', 'renovation'],
                why: 'Condensing boilers recover heat from the flue gases and use noticeably less fuel. A non-condensing boiler is not only inefficient, it also indicates the heating system has not been modernised - which usually means the radiators and controls are old too.'
            },
            {
                text: 'Check mazout/gas/electric heating type and what conversion would cost',
                tags: ['hvac', 'renovation'],
                why: 'Heating-oil systems require a tank, yearly servicing and carry soil-contamination risk; electric direct heating is very expensive to run. Switching fuel means a new appliance, new flue, possibly a gas connection, and removing or decommissioning the old tank.'
            },
            {
                text: 'Inspect warmtepomp (heat pump) if present - type, age and whether the house suits it',
                tags: ['hvac', 'renovation'],
                why: 'A heat pump only performs well in a well-insulated house with low-temperature emitters (underfloor heating or oversized radiators). A heat pump fitted to a poorly insulated house with small radiators produces high bills and disappointed owners.'
            },
            {
                text: 'Test the heating system in every room, including the thermostat',
                tags: ['hvac'],
                why: 'Ask to turn the heating on even in summer. Radiators that stay cold, that are cold at the bottom (sludge) or hot only near the boiler show a system that needs balancing, flushing or repair. It is the only way to see the truth about the system.'
            },
            {
                text: 'Check radiatoren (radiators) condition, sizing and valves',
                tags: ['hvac'],
                why: 'Rust marks, leaking valves or radiators that are obviously too small for the room mean cost either way: replacement, or a house that never feels warm. Thermostatic valves on each radiator are a cheap and effective saving if they are missing.'
            },
            {
                text: 'Verify vloerverwarming (underfloor heating) - zones, manifold and controls',
                tags: ['hvac', 'renovation'],
                why: 'Underfloor heating is excellent with a heat pump, but a leak or a blockage in a buried circuit is very hard to repair. Ask for the as-built drawing showing where the loops run - you will need it the first time you want to drill into the floor.'
            },
            {
                text: 'Ask for the onderhoudsattest (maintenance certificate) of the heating installation',
                tags: ['hvac', 'documents'],
                deadline: 'heating',
                why: 'Servicing is a legal obligation (in Flanders yearly for liquid fuel, every 2 years for gas). Missing certificates mean carbon-monoxide risk, higher consumption, and a possible refusal by your fire insurer. The reports also show what has already gone wrong.'
            },
            {
                text: 'Check the ventilation system type (A, C or D) and whether it works',
                tags: ['hvac', 'renovation'],
                deadline: 'ventilation',
                why: 'A family produces roughly 10 litres of water vapour a day. In an airtight, insulated house without working ventilation that moisture becomes mould within one winter. Switch the system on and hold a sheet of paper to the extract grilles - it should stick.'
            },
            {
                text: 'Verify mechanical ventilation with heat recovery (WTW/VMC) - filters and ducts',
                tags: ['hvac', 'renovation'],
                why: 'A heat-recovery unit only works if the filters are changed and the ducts are clean. Blocked filters and never-cleaned ducts are common, and they turn an efficient system into a noisy, dirty and ineffective one. Ask when the ducts were last cleaned.'
            },
            {
                text: 'Inspect ventilatieroosters (ventilation grilles) in every room',
                tags: ['hvac'],
                deadline: 'ventilation',
                why: 'Grilles taped shut, painted over or stuffed with cloth show that the occupants were fighting draughts or noise. The moisture that should have left through those grilles is now inside the walls, the insulation or the furniture.'
            },
            {
                text: 'Check air conditioning or cooling if present, and the risk of summer overheating',
                tags: ['hvac'],
                why: 'Belgian summers are getting hotter and well-insulated houses with large south or west-facing glass overheat badly. Note whether there is external shading; retro-fitting shutters or screens is far more effective and cheaper than adding cooling.'
            },
            {
                text: 'Check the mazout/stookolie tank (oil tank) - age, location, certificate and leaks',
                tags: ['hvac', 'basement'],
                why: 'Underground and cellar tanks must meet strict rules and be inspected periodically. A leaking tank is a soil-contamination case that can cost tens of thousands of euros to remediate, and abandoned tanks must be emptied, cleaned and certified - not simply left in place.'
            },
            {
                text: 'Verify the gas installation and connection certificate',
                tags: ['hvac', 'documents'],
                why: 'Gas leaks and badly vented appliances cause explosions and carbon-monoxide poisoning. Check that flexible hoses are within their date, that the appliance room has permanent ventilation, and that a conformity certificate exists.'
            },
            {
                text: 'Ask for onderhoud (service) records, manuals and installer details',
                tags: ['hvac'],
                why: 'A complete service history tells you the installation was cared for and gives you a technician who already knows the system. No records at all usually means no maintenance - assume the worst and price accordingly.'
            },
            {
                text: 'Check the chimney/flue type and whether it suits a modern appliance',
                tags: ['hvac', 'structural', 'renovation'],
                why: 'Modern condensing boilers need a different flue from old atmospheric ones, and an old masonry chimney usually has to be lined. That lining is a real cost that people discover only after they have ordered the new boiler.'
            }
        ]
    },
    {
        category: 'renovation',
        title: 'Renovation Potential & Checks (Renovatie)',
        icon: 'fa-tools',
        items: [
            {
                text: 'Check whether an omgevingsvergunning (permit) is required for your planned changes',
                tags: ['renovation', 'documents'],
                deadline: 'permit',
                why: 'Permit rules vary per municipality and per zone. Starting works without a permit can lead to a stop order, a fine and an obligation to undo the work. Ask the municipality before you buy if your plans are the reason you want the house.'
            },
            {
                text: 'Get a realistic total renovation budget with quotations, not estimates',
                tags: ['renovation'],
                why: 'The most common financial mistake buyers make is underestimating renovation by a factor of two. Get at least one real quotation for the biggest items (roof, electrics, heating, insulation) before you bid, and add a 15-20% contingency for what you cannot see yet.'
            },
            {
                text: 'Check the order of works - insulation and airtightness before finishes',
                tags: ['renovation'],
                why: 'Doing things in the wrong order means paying twice: new plaster before rewiring, a new kitchen before the roof, or new windows before insulating. Plan the sequence around the building fabric first, the services second and the finishes last.'
            },
            {
                text: 'Verify plat dak isolatie (flat roof insulation) feasibility - external vs internal',
                tags: ['renovation', 'exterior'],
                why: 'Insulating a flat roof from the outside is the correct method and usually means a new membrane at the same time. Insulating from the inside is cheaper but traps moisture in the deck and can rot it. This choice determines whether you also need to raise domes, doors and upstands.'
            },
            {
                text: 'Check whether external insulation affects door thresholds and roof access',
                tags: ['renovation', 'exterior'],
                why: 'Adding 12-20 cm on top of a flat roof or terrace raises the finished level, so doors onto that roof may no longer open, and the upstand height drops below the required minimum. It is a classic and expensive surprise mid-project.'
            },
            {
                text: 'Verify lichtkoepel verhogen (raising roof domes) is included in the budget',
                tags: ['renovation', 'exterior'],
                why: 'After external insulation the dome upstand must still project sufficiently above the finished roof, otherwise water runs straight in. Raising domes and skylights is a specialised job that quotations often quietly omit.'
            },
            {
                text: 'Assess gevelisolatie (facade insulation) - external, cavity or internal',
                tags: ['renovation', 'exterior'],
                why: 'External insulation performs best and removes cold bridges, but changes the appearance and may need a permit. Cavity fill is cheapest if the cavity is suitable. Internal insulation is the riskiest: badly detailed, it moves the condensation point inside the wall and causes hidden damp and rot.'
            },
            {
                text: 'Check whether the cavity is suitable for spouwmuurisolatie',
                tags: ['renovation', 'exterior'],
                why: 'The cavity needs to be wide enough, clean, dry and free of mortar bridges. Injecting a damp or debris-filled cavity creates permanent damp patches inside. A borescope inspection before injection costs little and prevents a very unpleasant outcome.'
            },
            {
                text: 'Verify whether internal insulation is possible without losing critical space',
                tags: ['renovation'],
                why: 'Internal insulation typically costs 8-14 cm off every external wall. In a small Belgian townhouse that can make a bedroom unusable, and it moves radiators, sockets and window reveals - all of which cost money the quotation may not mention.'
            },
            {
                text: 'Check vloerisolatie (floor insulation) feasibility and its effect on ceiling height',
                tags: ['renovation', 'basement'],
                why: 'Floor insulation plus screed takes 10-15 cm. That may drop the ceiling height below the habitable minimum, force you to shorten every internal door, and change the level at the front door and stair. Measure before you commit.'
            },
            {
                text: 'Verify kruipruimte (crawl space) accessibility, height and dryness',
                tags: ['renovation', 'basement'],
                why: 'An accessible, dry crawl space makes floor insulation and pipe repairs cheap. A wet, low or inaccessible one means the only route is from above - which means removing the whole floor. Look inside with a torch if there is a hatch.'
            },
            {
                text: 'Check whether replacing the windows is needed for the target EPC label',
                tags: ['renovation', 'exterior'],
                info: 'glazing',
                why: 'Windows are usually the second largest energy renovation cost after the roof. If the house has a Flemish renovation obligation, model which measures actually get you to label D - sometimes roof plus wall insulation is enough and the windows can wait a few years.'
            },
            {
                text: 'Assess the potential of a zolderverbouwing (attic conversion)',
                tags: ['renovation', 'attic'],
                why: 'An attic conversion is the cheapest way to add a room - but only if the headroom, floor structure, staircase, daylight and escape route already allow it. If any of those has to be created, the cost per square metre can exceed that of an extension.'
            },
            {
                text: 'Check whether a dakopbouw or dormer (dakkapel) is permitted here',
                tags: ['renovation', 'attic', 'documents'],
                deadline: 'permit',
                why: 'Municipal rules on roof volumes, dormer widths and street-facing appearance vary enormously. Buying a house on the assumption that you can raise the roof, without checking the local regulations, is one of the costliest assumptions possible.'
            },
            {
                text: 'Verify whether a kelderverbouwing (basement conversion) is realistic',
                tags: ['renovation', 'basement'],
                why: 'Cellar conversions fail on three things: height, damp and daylight. Lowering a cellar floor means underpinning the foundations - a heavy engineering job. Be sure the ambition matches the building before you pay for the house.'
            },
            {
                text: 'Check whether an aanbouw (extension) fits within the plot rules and setbacks',
                tags: ['renovation', 'exterior', 'documents'],
                deadline: 'permit',
                why: 'Setbacks from boundaries, maximum built area, depth relative to the neighbours and rainwater infiltration rules all limit what you can build. The neighbours\' windows also matter legally. Check with the municipality, not with the seller.'
            },
            {
                text: 'Assess badkamerrenovatie (bathroom renovation) complexity',
                tags: ['renovation', 'bathroom'],
                why: 'A bathroom looks cosmetic but is the most technical room in the house: waterproofing, falls, ventilation, electrics in wet zones and drainage all have to be right. Cutting corners here is what produces the leaks the next owner will find.'
            },
            {
                text: 'Check whether keukenrenovatie (kitchen renovation) requires moving plumbing or drains',
                tags: ['renovation', 'kitchen'],
                why: 'Keeping the sink and appliances where they are keeps a kitchen renovation affordable. Moving them, especially in a concrete floor, adds thousands. Decide your layout before you value the kitchen you are buying.'
            },
            {
                text: 'Verify whether the plumbing needs full replacement',
                tags: ['renovation', 'plumbing'],
                why: 'Lead supply pipes must go, and galvanised steel is usually not far behind. Replacing the pipework is far cheaper while the walls and floors are already open, so it belongs in the first phase of a renovation, not the last.'
            },
            {
                text: 'Check whether a complete rewire (herkabeling) is required',
                tags: ['renovation', 'electrical'],
                why: 'A rewire means chasing every wall and redecorating afterwards, so it must happen before any finishes. Combining it with insulation and plastering work saves a large amount; doing it afterwards means paying twice for the same walls.'
            },
            {
                text: 'Assess facade cleaning, repointing and brick repair needs',
                tags: ['renovation', 'exterior'],
                why: 'Repointing an average facade runs roughly 40-80 EUR/m2 including scaffolding, so a full house is a serious budget line. It is also not optional if the joints are open - water in the wall undoes every other improvement you make.'
            },
            {
                text: 'Check whether a chimney can be removed or must be preserved',
                tags: ['renovation', 'structural'],
                why: 'Removing a chimney frees floor space, but the stack may be load-bearing, shared with a neighbour, or needed as a ventilation or flue duct. In a protected townscape the visible part may have to stay. Check before you plan the layout around it.'
            },
            {
                text: 'Check the potential for zonnepanelen (solar panels): orientation, shading and roof condition',
                tags: ['renovation', 'exterior', 'electrical'],
                why: 'South is best, east-west is still good, north is not worth it. Chimneys, trees and neighbouring buildings can destroy the yield of a whole string. Above all: never put panels on a roof that will need renewing within 10 years - removing and refitting them costs thousands.'
            },
            {
                text: 'Verify the roof structure can carry solar panels or a green roof',
                tags: ['renovation', 'exterior', 'structural'],
                why: 'Panels add weight and wind load; a green roof adds a lot more, especially when saturated. On an older roof structure this needs to be verified by an engineer - it is exactly the kind of added load that makes a ridge sag over time.'
            },
            {
                text: 'Budget for asbestsanering (asbestos removal) where required',
                tags: ['renovation', 'asbestos'],
                deadline: 'asbestos',
                why: 'Renovation is the trigger that turns "asbestos present" into "asbestos must be removed by a certified company". Get this quoted separately and early, because it also dictates the sequence and the site setup of everything else.'
            },
            {
                text: 'Check available premiums, loans and VAT rate before starting works',
                tags: ['renovation', 'documents'],
                why: 'Mijn VerbouwPremie, Mijn VerbouwLening and the reduced VAT rate for older homes can change your budget substantially - but most schemes require you to apply BEFORE the works or to use registered contractors. Applying afterwards usually means losing the money.'
            }
        ]
    },
    {
        category: 'apartment',
        title: 'Apartment Specific (Appartement)',
        icon: 'fa-building',
        items: [
            {
                text: 'Request the syndicus information and the base deed (basisakte)',
                tags: ['apartment', 'documents'],
                deadline: 'syndic',
                why: 'The base deed defines exactly what you own privately, what is common, and your share (quotiteiten) in every shared cost. It also contains restrictions on pets, short-term letting, professional use and terrace alterations that you cannot change on your own.'
            },
            {
                text: 'Read the minutes of the last three general assemblies (algemene vergadering)',
                tags: ['apartment', 'documents'],
                deadline: 'syndic',
                why: 'This is where you find the real state of the building: voted works, disputes, unpaid charges and postponed decisions. A decided facade or roof renovation can mean 10,000-40,000 EUR per unit, and the decision date - not your purchase date - usually determines who pays it.'
            },
            {
                text: 'Review gemeenschappelijke kosten (common charges) and what they include',
                tags: ['apartment', 'documents'],
                why: 'Monthly charges vary enormously and are a permanent part of your housing cost. Check whether heating, water, lift maintenance, cleaning, insurance and syndicus fees are included, and compare the figure with the building\'s actual budget rather than the advertisement.'
            },
            {
                text: 'Verify the reservefonds (reserve fund) balance relative to the building\'s age',
                tags: ['apartment', 'documents'],
                deadline: 'syndic',
                why: 'A nearly empty reserve fund in a 40-year-old building means the next big repair will be an immediate call for funds from the owners. A healthy fund is one of the strongest signs of a well-run co-ownership.'
            },
            {
                text: 'Check for planned or decided grote werken (major works)',
                tags: ['apartment', 'renovation'],
                why: 'Facade renovation, roof replacement, lift modernisation, collective heating replacement and energy renovation of the shared envelope are the big ones. Ask specifically whether any of them has been voted, estimated or postponed - a postponed decision is a bill in waiting.'
            },
            {
                text: 'Verify lift (elevator) age, modernisation status and inspection certificate',
                tags: ['apartment'],
                why: 'Belgian lifts have to be modernised to meet safety requirements, and a full modernisation is a very large shared cost. Check the last inspection report and whether the modernisation has been done, budgeted, or is still being postponed.'
            },
            {
                text: 'Inspect gemeenschappelijke delen (common areas): hall, stairwell, roof and cellars',
                tags: ['apartment'],
                why: 'The condition of the common parts is the most honest indicator of how the building is managed. Damp in the underground car park, a tired roof or a peeling stairwell are all future invoices that will arrive with your name on them.'
            },
            {
                text: 'Check soundproofing between apartments and from the stairwell',
                tags: ['apartment'],
                why: 'Impact noise from the flat above is the number one complaint in Belgian apartments and is virtually impossible to fix from your side. Visit at a different time of day, and ask whether the building rules require carpet or an acoustic underlay on floors.'
            },
            {
                text: 'Verify whether the terrace or balcony is private or common property',
                tags: ['apartment', 'exterior'],
                why: 'A terrace is often common property with exclusive use, which means you may not change the floor, the railing or the waterproofing on your own - and repairs may be a shared decision. Check the base deed, not the sales brochure.'
            },
            {
                text: 'Check individual metering for water, heating and electricity',
                tags: ['apartment', 'plumbing'],
                why: 'With collective heating and no individual meters you pay for your neighbours\' consumption according to your share. That can be a permanent and significant extra cost, and it also removes any incentive for the building to save energy.'
            },
            {
                text: 'Verify the cellar, garage or parking assignment and whether it is included',
                tags: ['apartment'],
                why: 'Parking and storage are often sold as separate lots with their own price, taxes and charges. Confirm the exact lot numbers in the deed rather than relying on what you were shown during the visit.'
            },
            {
                text: 'Check bike storage, waste facilities and access arrangements',
                tags: ['apartment'],
                why: 'These are the daily-life details that decide whether an apartment is pleasant to live in. They are also common sources of disputes in the general assembly, so their state tells you something about the co-ownership.'
            },
            {
                text: 'Verify the building year, EPC of the unit and of the shared installations',
                tags: ['apartment', 'documents'],
                deadline: 'epc',
                why: 'In Flanders the renovation obligation applies per residential unit, but the shared roof, facade and heating are decided collectively. That means you can be legally obliged to reach label D while depending on a general assembly vote to make it possible - check both before you buy.'
            },
            {
                text: 'Check the fire safety provisions: detectors, escape routes and compartmentation',
                tags: ['apartment', 'electrical'],
                deadline: 'smokedetector',
                why: 'Apartment buildings have specific fire-safety requirements for stairwells, doors and detection. Blocked escape routes, wedged fire doors and missing detectors are both an immediate danger and a sign of weak management.'
            },
            {
                text: 'Verify internet and TV connectivity (coax, fibre) available in the building',
                tags: ['apartment', 'electrical'],
                why: 'In an apartment you cannot simply order a new connection: bringing fibre into the building may require a general assembly decision. Check what is physically present in the unit and in the technical shaft.'
            },
            {
                text: 'Ask whether there are ongoing disputes or unpaid charges in the co-ownership',
                tags: ['apartment', 'documents'],
                why: 'Legal proceedings against a contractor or an owner, and significant arrears, affect the finances of the whole building - and therefore yours. The syndicus must provide this information; ask for it explicitly in writing.'
            }
        ]
    }
];

/* ---------------------------------------------------------------------
 * Quick-check subset
 * ---------------------------------------------------------------------
 * The ids of the items shown in "Quick check" mode: the highest-impact
 * points a visitor can see or ask about during a first, short viewing.
 * Ids are position based (see the header of this file), so this list
 * must be revisited whenever items are added to a category.
 * ------------------------------------------------------------------- */
const QUICK_CHECK_IDS = [
    /* papers you can ask for on the spot */
    'documents-0', 'documents-2', 'documents-3', 'documents-7',
    /* visible from the street */
    'asbestos-0',
    'exterior-0', 'exterior-1', 'exterior-6', 'exterior-8', 'exterior-9', 'exterior-11',
    /* two minutes per room */
    'kitchen-4', 'kitchen-5',
    'bathroom-1', 'bathroom-5', 'bathroom-10',
    'bedroom-4',
    'livingroom-9',
    'basement-0', 'basement-2',
    'attic-1', 'attic-2',
    /* the expensive systems */
    'plumbing-1', 'plumbing-2', 'plumbing-11',
    'electrical-1', 'electrical-3', 'electrical-7', 'electrical-11',
    'structural-0', 'structural-12', 'structural-16',
    'hvac-0', 'hvac-12',
    /* apartment red flags */
    'apartment-2', 'apartment-3', 'apartment-4'
];
