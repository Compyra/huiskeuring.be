# FACTCHECK — legal facts register

Every legal rule, deadline, tax rate and amount shown to users lives in
[js/legal.js](js/legal.js) (topics) and [js/links.js](js/links.js) (URLs).
This file is the **human-readable register** of those facts: what was checked,
against which official source, and on which date. If this file and `legal.js`
ever disagree, `legal.js` is what users see — fix the mismatch immediately.

- **Full review completed: 2026-08-25.** Every region block in every topic is
  now `verified` or `not-applicable`. Zero `unverified` blocks remain.
- Next review due: **2027-02-25** (6-month cadence, see `LEGAL_META`).
- Method: each fact below was read on the official page listed, fetched on the
  date shown - not recalled from memory, not taken from a commercial site.
  Commercial/secondary pages were only used to *find* official pages.
- Run `tools\verify.ps1` before every release: it re-tests every source URL
  (HTTP 200, 3 attempts).

## How to redo a review

1. Open every URL in `sources` of every topic in `legal.js`; confirm HTTP 200.
2. Re-read the figure/deadline against the page. Update `lastVerified`.
3. If a fact can no longer be confirmed, set `status: 'unverified'` — the UI
   then tells users honestly instead of guessing.
4. Update `LEGAL_META` (lastFullReview, nextReviewDue, bump `contentVersion`
   so returning users see the freshness banner).
5. Update this file and the changelog in [todo.md](todo.md).

## The facts, per topic

### epc — Energy performance certificate
| Region | Fact checked 2026-08-25 | Source |
|---|---|---|
| Flanders | EPC valid 10 years. Label E/F bought since 1-1-2023 → renovate to ≥ D within **6 years** of the deed (raised from 5, final 12/12/2025, applies to running and new transfers). Tightening path to C/B/A abolished. Fine residential €500–5,000 + new deadline. Rentals: minimum label from 2030 (E) stepping to 2040 (C); terraced/apartments D (2030) → C (2035). | vlaanderen.be renovatieverplichting + minimaal EPC-label pages |
| Wallonia | PEB valid **max 10 years**, approved certifier, required **before advertising**; indicators mandatory in every advert. **No purchase-triggered renovation obligation**; 2050 label-A stock strategy only. | wallonie.be démarche + energie.wallonie.be certificat PEB |
| Brussels | PEB valid 10 years, required at sale and rental from first marketing. No per-purchase renovation obligation. | environnement.brussels certificat PEB |

### electrical — RGIE/AREI inspection (federal)
Report from a recognised body mandatory at sale; inspection valid 25 years;
non-compliant → **18 months** from deed to fix and re-inspect. Same in all
three regions. Source: economie.fgov.be / vlaanderen.be (federal rule).

### asbestos — asbestattest
| Region | Fact | Source |
|---|---|---|
| Flanders | Mandatory at transfer of accessible constructions built **before 2001**; < 20 m² exempt unless total ≥ 20 m² or part of larger complex; present at the **compromis**; validity **10 years**; OVAM retribution **€59** (since 05-02-2025); **2032**: required for every owner. | vlaanderen.be/asbestattest |
| Wallonia / Brussels | Not applicable — no equivalent certificate obligation at sale. | — |

### soil — bodemattest / BDES / attestation du sol
| Region | Fact | Source |
|---|---|---|
| Flanders | OVAM bodemattest required **before the compromis is signed**. | ovam.vlaanderen.be |
| Wallonia | BDES extract required before any transfer of the land. | environnement.wallonie.be BDES |
| Brussels | Soil attestation from Bruxelles Environnement required for **every parcel transfer** (apartments: the parcel under the building); buyer informed **at the compromis or offer stage**; allow a few weeks to obtain. | environnement.brussels attestation du sol |

### heating — boiler inspection intervals
| Region | Fact | Source |
|---|---|---|
| Flanders | Gas every **2 years**, oil/solid every **year** (existing entry, re-confirmed). | vlaanderen.be keuring verwarming |
| Wallonia | Oil and solid fuels: **every year**. Gas ≤ 100 kW: **every 3 years** (> 100 kW: 2 years). Clock runs from the boiler's **first commissioning**, technician approved per fuel. | energie.wallonie.be contrôle périodique |
| Brussels | "PEB periodic control": gas every **2 years**, oil/solid every **year**, only by Brussels-Environment-approved technicians. | environnement.brussels/entretien-chaudiere |

### smokedetector — smoke detectors
| Region | Fact | Source |
|---|---|---|
| Flanders | Mandatory in every home since 1-1-2020, every storey; missing = category II defect. | vlaanderen.be rookmelders |
| Wallonia | **Art. 4bis Code wallon de l'habitation durable, since 2004**: every dwelling ≥ 1 working detector; NBN EN 14604, BOSEC or EU equivalent, 5-year guarantee; owner installs, tenant maintains. | wallonie.be démarche détecteurs |
| Brussels | Since **1-1-2025 ALL dwellings** (previously rentals only); ≥ 1 per floor; ≥ 4 detectors → interconnected or centralised (decree 28-09-2023). | be.brussels détecteurs de fumée |

### oiltank — heating-oil tanks
| Region | Fact | Source |
|---|---|---|
| Flanders | Check at placement always. < 6,000 l: buried every **5 years**; above-ground (incl. cellar) **no periodic check since 1-3-2009**. ≥ 6,000 l: buried limited 2-yearly + thorough 15-yearly; above-ground 3-yearly; stricter in water-catchment areas. Green/orange (6 months to fix)/red (no filling, reported in 14 days) markers. No legal duty to hand certificate at sale, but part of seller's delivery duty. | vlaanderen.be stookolietank woning |
| Wallonia | ≥ **3,000 l** (even split over tanks) = class 3: declaration + periodic control by approved technician (AGW 17-07-2003). < 3,000 l: no declaration. Disused tanks: empty, clean, neutralise, with certificate. | wallonie.be gérer sa citerne + environnement.wallonie.be |
| Brussels | Above-ground < **3,000 l**: not classified, no declaration/permit. Larger or buried: classified installation → declaration or environmental permit via commune / Bruxelles Environnement. | environnement.brussels citerne à mazout |

### registration — registration duty
| Region | Fact | Source |
|---|---|---|
| Flanders | **2%** sole own home since 1-1-2025 (deed date decides); 12% ordinary; 10% farmland/nature; 1% major energy renovation & monuments. Since **1-1-2026**: natural persons only, full ownership only, register within 3 years + stay ≥ 1 uninterrupted year. | vlaanderen.be verkooprecht pages |
| Wallonia | **3%** sole own home since **1-1-2025** (was 12.5% ordinary), incl. building land/on-plan for that home; no cadastral-income condition; ordinary rate **12.5%**. | wallonie.be réduction droits d'enregistrement |
| Brussels | 12.5% with abattement on first €200,000 (ceiling €600,000, 5-year residence condition). | be.brussels abattement |

### insurance — Verzekering Gewaarborgd Wonen (Flanders)
Free; apply within **12 months** of first mortgage drawdown; covers up to 3
years of instalments; 10-year cover. Wallonia/Brussels: no equivalent (existing
entries re-confirmed). Source: vlaanderen.be.

### flooding — flood information duty
Seller must disclose flood scores (P/G in Flanders) in adverts and deeds;
official maps: waterinfo.be / Géoportail / environnement.brussels (existing
entries re-confirmed).

### water — rainwater & drainage
| Region | Fact | Source |
|---|---|---|
| Flanders | GSV Hemelwater since **2-10-2023** (tank + reuse + infiltration, applies to permit-exempt works too — non-compliance voids the exemption). Keuring privéwaterafvoer since 2011, new specs since **12-1-2026**, required in 4 cases; zoneringsplan decides sewer/IBA/septic. | omgeving.vlaanderen.be + vlaanderen.be + VMM |
| Wallonia | **CertIBEau** mandatory since **1-6-2021** for every first connection to the water network (new builds); covers drinking water + waste water side. Not required at sale of existing homes. Sanitation regime via règlement général d'assainissement. | wallonie.be CertIBEau démarche |
| Brussels | Tank ≥ **33 l/m² roof** connected to ≥ 1 outside tap + WC(s); "0 rejet" to sewer; via environmental permit; derogations only for polluted soil / catchment zone 3. | environnement.brussels gestion des eaux de pluie |

### permit — planning permission & information
| Region | Fact | Source |
|---|---|---|
| Flanders | Vergunningenregister + as-built; check via Omgevingsloket (existing entry re-confirmed). | omgevingsloketvlaanderen.be |
| Wallonia | Permis d'urbanisme via the commune; ask urbanistic information before the compromis (existing entry re-confirmed). | wallonie.be démarche permis |
| Brussels | **Renseignements urbanistiques mandatory for every sale (art. 275 CoBAT)**, requested from the commune, usually by the notary; states the lawful planning destination. | urba.irisnet.be cadre légal + bruxelles.be |

### Advisory topics (no legal deadline)
roofridge, moisture, ventilation, glazing, cadastre, syndic, drought — practical
inspection knowledge, no legal facts to verify beyond the DOV links (drought:
plastische-gronden map + damage register > 3 mm threshold, both re-confirmed).

## Known limitations

- Figures like notary fees and boiler-replacement costs quoted in `why` texts
  are deliberately expressed as ranges ("thousands of euros"), not as facts.
- Brussels abattement ceiling/conditions have changed several times; the entry
  says so and tells the buyer to confirm with the notary.
- Municipalities may impose stricter rules than every regional rule listed
  here; the UI says this wherever it applies (rainwater, sewers, permits).
