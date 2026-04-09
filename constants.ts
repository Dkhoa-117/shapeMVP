import {
  Solution,
  Project,
  BlogPost,
  SolutionStatus,
  InitiativeType,
  Initiative,
  User,
  AuditLog,
  Filiale,
  SolutionPhase,
  SolutionCost,
  SolutionCible,
  SolutionLevierValeur,
} from './types';

export const APP_NAME = 'Bouygues Shape the Future';

export const MOCK_INITIATIVES: Initiative[] = [
  {
    id: 'i1',
    slug: 'living-avenues',
    name: 'Living Avenues',
    type: InitiativeType.VilleDuFutur,
    description:
      'Reimagining urban spaces for sustainability, connectivity, and well-being.',
    overview:
      'As by 2050, 70% of the world population will live in cities, we are committed to making them more sustainable, desirable and inclusive.',
    problem:
      'Rapid urbanization is creating pressure on infrastructure, energy consumption, and quality of life. Cities account for 70% of global CO2 emissions.',
    solution:
      'We develop integrated solutions for low-carbon construction, smart energy grids, and soft mobility to create resilient urban environments.',
    keyFigures: [
      { label: 'Urban Projects', value: '500+', unit: '' },
      { label: 'CO2 Saved', value: '2M', unit: 'tons' },
    ],
    featuredImage: 'https://picsum.photos/id/48/1920/800',
    color: '#096D6D',
    views: 12500,
  },
  {
    id: 'i2',
    slug: 'resilience-littorale',
    name: 'Resilience du trait et de côte',
    type: InitiativeType.Ports,
    description:
      'Optimizing maritime infrastructure for global trade and coastal protection.',
    overview:
      'Coastal areas are the front lines of climate change. We transform them into resilient and sustainable environments.',
    problem:
      'Rising sea levels and erosion threaten coastal communities and infrastructure.',
    solution:
      'Our coastal resilience solutions leverage nature-based designs and low-carbon materials for protection.',
    keyFigures: [
      { label: 'Coastal Projects', value: '45', unit: '' },
      { label: 'Efficiency', value: '+30', unit: '%' },
    ],
    featuredImage: 'https://picsum.photos/id/20/1920/800',
    color: '#309BB2',
    views: 8400,
  },
  {
    id: 'i3',
    slug: 'aeroports',
    name: 'Aéroports',
    type: InitiativeType.Aeroports,
    description:
      'Decarbonizing aviation on the ground through smart terminals and green energy.',
    overview:
      'Airports must reinvent themselves to reach net-zero. We accompany them in this crucial transition.',
    problem:
      'Airports are energy-intensive hubs. The challenge is to reduce ground emissions and improve passenger flow simultaneously.',
    solution:
      'We deploy geothermal cooling, solar roofing, and AI-driven flow management to create the Green Airport of tomorrow.',
    keyFigures: [
      { label: 'Airports', value: '20+', unit: 'Global' },
      { label: 'Energy Cut', value: '40', unit: '%' },
    ],
    featuredImage: 'https://picsum.photos/id/54/1920/800',
    color: '#6B8DE7',
    views: 6200,
  },
  {
    id: 'i4',
    slug: 'infrastructures-soins',
    name: 'Infrastructures de soins',
    type: InitiativeType.Soins,
    description:
      'Designing and building the healthcare facilities of tomorrow.',
    overview:
      'Healthcare infrastructure is evolving. We build facilities that are efficient, sustainable, and patient-centered.',
    problem:
      'Aging populations and new health challenges require modern, adaptable healthcare infrastructure.',
    solution:
      'We provide end-to-end solutions for healthcare facilities, from sustainable construction to digital integration.',
    keyFigures: [
      { label: 'Hospitals Built', value: '120+', unit: '' },
      { label: 'Patient Capacity', value: '50k+', unit: '' },
    ],
    featuredImage: 'https://picsum.photos/id/201/1920/800',
    color: '#FAB82F',
    views: 4100,
  },
  {
    id: 'i5',
    slug: 'data-centers',
    name: 'Data Centers',
    type: InitiativeType.DataCenters,
    description:
      'Sustainable and high-performance infrastructure for the digital age.',
    overview:
      'Data centers are the backbone of the digital economy. We make them more energy-efficient and reliable.',
    problem:
      'Data centers consume massive amounts of energy and water for cooling.',
    solution:
      'We implement advanced cooling technologies and renewable energy integration for sustainable data centers.',
    keyFigures: [
      { label: 'PUE Target', value: '< 1.2', unit: '' },
      { label: 'MW Managed', value: '800+', unit: '' },
    ],
    featuredImage: 'https://picsum.photos/id/60/1920/800',
    color: '#E74C3C',
    views: 3200,
  },
  {
    id: 'i6',
    slug: 'journal-ia',
    name: "Journal de l'IA",
    type: InitiativeType.JournalIA,
    description:
      'Exploring the impact of Artificial Intelligence on infrastructure and construction.',
    overview:
      'AI is transforming our industry. We track and share the latest innovations and use cases.',
    problem:
      'The rapid pace of AI development makes it difficult to identify truly impactful solutions for construction.',
    solution:
      'We curate and analyze AI applications in design, site management, and predictive maintenance.',
    keyFigures: [
      { label: 'Articles', value: '200+', unit: '' },
      { label: 'Case Studies', value: '50+', unit: '' },
    ],
    featuredImage: 'https://picsum.photos/id/1/1920/800',
    color: '#9B59B6',
    views: 5400,
    ratings: { valeur: 4, complexite: 3, maturite: 4 },
  },
];

export const MOCK_SOLUTIONS: Solution[] = [
  {
    id: '4',
    slug: 'certicheck-ai',
    title: 'CERTICHECK AI',
    subtitle: 'Automatisation de la conformité',
    description:
      "CertiCheck AI a pour objectif de simplifier et automatiser le processus de vérification de la conformité des attestations d'assurance responsabilité civile des sous-traitants en extrayant et en vérifiant automatiquement les informations clés.",
    domain: 'Digital',
    initiative: [InitiativeType.JournalIA],
    status: SolutionStatus.Active,
    labels: ['AI', 'Compliance', 'Automation'],
    keyFigures: [],
    imageUrl:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2670&auto=format&fit=crop',
    ratings: { valeur: 4, complexite: 4, maturite: 3 },
    useCaseHtml: `<p>Le processus de vérification de la conformité des attestations d'assurance responsabilité civile des sous-traitants est actuellement un processus <strong>100% manuel, chronophage et sujet à erreurs</strong>.</p>
<p>CertiCheck AI a pour objectif de simplifier et automatiser ce processus en extrayant et en vérifiant automatiquement les informations clés de chaque attestation pour assurer leur conformité avec les critères établis.</p>
<p>L'outil extrait les éléments essentiels sur chacune des attestations concernant :</p>
<ul>
  <li>l'émetteur de l'attestation</li>
  <li>le sous-traitant assuré</li>
  <li>les activités assurées</li>
  <li>la validité temporelle</li>
  <li>la validité territoriale</li>
  <li>les montants de couverture</li>
</ul>
<p>Le POC est en cours sur un périmètre France et un périmètre Suisse Chatbot.</p>`,
    valuesGainsHtml: `<p>En automatisant la vérification de la conformité des attestations d'assurance, CertiCheck AI permet de :</p>
<ul>
  <li>réduire la charge de travail des équipes administratives en charge de ces vérifications</li>
  <li>minimiser les risques liés aux assurances non conformes</li>
</ul>
<p>Cette initiative s'inscrit dans les enjeux de digitalisation, simplification et d'optimisation de nos processus.</p>
<p>CertiCheck AI ouvre la voie à une automatisation plus large. En France, l'outil pourrait être élargi à la vérification des attestations URSSAF et des extraits KBIS.</p>`,
    sidebarInfo: {
      filiale: [
        Filiale.Construction,
        Filiale.BatimentInternational,
        Filiale.BatimentFrance,
      ],
      cible: [SolutionCible.Operationnel],
      levierValeur: [
        SolutionLevierValeur.Productivite,
        SolutionLevierValeur.Risque,
      ],
      plateforme: 'Snowflake / Mistral',
      algorithmes: 'OCR (Mistral OCR) / LLM (Mistral Large)',
      phase: SolutionPhase.POC,
      cout: SolutionCost.Medium,
    },
  },
  {
    id: '1',
    slug: 'eco-concrete-pro',
    title: 'EcoConcrete Pro',
    subtitle: 'Low-carbon concrete formulation',
    description:
      'A revolutionary concrete mix that reduces CO2 emissions by 40% while maintaining structural integrity required for high-rise infrastructure.',
    domain: 'Materials',
    initiative: [InitiativeType.VilleDuFutur, InitiativeType.Soins],
    status: SolutionStatus.Active,
    labels: ['Sustainable', 'Low Carbon', 'Innovation'],
    keyFigures: [
      { label: 'CO2 Reduction', value: '40', unit: '%' },
      { label: 'Strength', value: '60', unit: 'MPa' },
    ],
    imageUrl: 'https://picsum.photos/id/16/800/600',
    lastModified: '2024-03-10',
    views: 3450,
    ratings: { valeur: 5, complexite: 2, maturite: 5 },
    sidebarInfo: {
      filiale: [Filiale.Construction],
      cible: [SolutionCible.Operationnel],
      levierValeur: [
        SolutionLevierValeur.Productivite,
        SolutionLevierValeur.Risque,
      ],
      plateforme: 'Internal Lab',
      algorithmes: 'Chemical Formulation AI',
      phase: SolutionPhase.IND,
      cout: SolutionCost.High,
    },
  },
  {
    id: '2',
    slug: 'smart-port-logistics',
    title: 'SmartPort Logistics',
    subtitle: 'AI-driven container management',
    description:
      'Optimizing port operations through real-time tracking and AI prediction models to reduce wait times and fuel consumption.',
    domain: 'Logistics',
    initiative: [InitiativeType.Ports],
    status: SolutionStatus.Beta,
    labels: ['AI', 'Efficiency', 'Maritime'],
    keyFigures: [
      { label: 'Efficiency Gain', value: '25', unit: '%' },
      { label: 'Ships/Day', value: '150' },
    ],
    imageUrl: 'https://picsum.photos/id/20/800/600',
    lastModified: '2024-03-12',
    views: 2100,
    ratings: { valeur: 4, complexite: 4, maturite: 3 },
    sidebarInfo: {
      filiale: [Filiale.TravauxPublics],
      cible: [SolutionCible.Management, SolutionCible.Operationnel],
      levierValeur: [SolutionLevierValeur.Productivite],
      plateforme: 'Azure / Databricks',
      algorithmes: 'Optimization / RL',
      phase: SolutionPhase.MVP,
      cout: SolutionCost.Medium,
    },
  },
  {
    id: '3',
    slug: 'green-airport-hvac',
    title: 'Green Aero HVAC',
    subtitle: 'Geothermal cooling for terminals',
    description:
      'Utilizing deep-earth geothermal loops to provide passive cooling for large airport terminals, significantly cutting energy costs.',
    domain: 'Energy',
    initiative: [InitiativeType.Aeroports],
    status: SolutionStatus.Active,
    labels: ['Geothermal', 'HVAC', 'Zero Emission'],
    keyFigures: [{ label: 'Energy Saved', value: '3.5', unit: 'GWh/yr' }],
    imageUrl: 'https://picsum.photos/id/54/800/600',
    lastModified: '2024-03-08',
    views: 5600,
    ratings: { valeur: 3, complexite: 5, maturite: 4 },
    sidebarInfo: {
      filiale: [Filiale.EnergiesServices],
      cible: [SolutionCible.Client],
      levierValeur: [
        SolutionLevierValeur.Revenu,
        SolutionLevierValeur.Productivite,
      ],
      plateforme: 'IoT Hub',
      algorithmes: 'Predictive Maintenance',
      phase: SolutionPhase.IND,
      cout: SolutionCost.Medium,
    },
  },
  // --- Seeded from PDF data ---
  {
    id: '5',
    slug: 'diagnostic-territoire',
    title: 'Diagnostic de Territoire',
    subtitle: 'Développement foncier',
    description:
      'Analyse automatisée de données territoriales pour décisions foncières.',
    domain: 'Développement foncier',
    initiative: [InitiativeType.JournalIA],
    status: SolutionStatus.Active,
    labels: ['IA générative'],
    keyFigures: [{ label: 'Analyse', value: '2 min', unit: 'vs 2 semaines' }],
    imageUrl: 'https://picsum.photos/id/96/800/600',
    lastModified: '2025-01-01',
    views: 0,
    ratings: { valeur: 5, complexite: 2, maturite: 3 },
    useCaseHtml: `<p>Les équipes de développement foncier de Bouygues Immobilier passaient <strong>jusqu'à 2 semaines</strong> à collecter, croiser et analyser manuellement des données territoriales (démographie, mobilité, concurrence, prix, etc.) avant de prendre une décision d'acquisition.</p>
<p>Diagnostic de Territoire automatise ce processus grâce à l'IA générative :</p>
<ul>
  <li>Agrégation automatique de sources de données territoriales hétérogènes</li>
  <li>Analyse contextuelle via GPT-4o avec prompts few-shot calibrés par les experts métier</li>
  <li>Génération d'un rapport de synthèse structuré en quelques minutes</li>
  <li>Comparaison multi-zones pour prioriser les opportunités foncières</li>
</ul>
<p>La solution est déployée en MVP et utilisée à la demande par les chargés de développement.</p>`,
    valuesGainsHtml: `<p>Diagnostic de Territoire transforme radicalement la productivité des équipes foncières :</p>
<ul>
  <li><strong>Analyse en 2 minutes au lieu de 2 semaines</strong> — gain de temps massif sur chaque opportunité étudiée</li>
  <li>Amélioration de la qualité des décisions grâce à une couverture de données plus exhaustive</li>
  <li>Capacité à étudier un plus grand nombre d'opportunités foncières en parallèle</li>
  <li>Standardisation des livrables d'analyse pour faciliter les arbitrages en comité</li>
</ul>
<p>Cette solution s'inscrit dans la transformation digitale de Bouygues Immobilier et ouvre la voie à d'autres automatisations dans les processus de développement.</p>`,
    sidebarInfo: {
      filiale: [Filiale.Immobilier],
      cible: [SolutionCible.Management],
      levierValeur: [SolutionLevierValeur.Productivite],
      plateforme: 'Azure, Python',
      algorithmes: 'GPT-4o, Few-shot',
      phase: SolutionPhase.MVP,
      cout: SolutionCost.Medium,
    },
  },
  {
    id: '6',
    slug: 'by-cycle',
    title: 'By Cycle',
    subtitle: 'Opérations / Logistique',
    description:
      'Automatisation de la détection de cycles opérationnels sans règles métiers.',
    domain: 'Opérations / Logistique',
    initiative: [InitiativeType.JournalIA],
    status: SolutionStatus.Active,
    labels: ['Machine Learning'],
    keyFigures: [
      {
        label: 'Impact',
        value: 'Réduction coûts & amélioration planification',
      },
    ],
    imageUrl: 'https://picsum.photos/id/111/800/600',
    lastModified: '2025-01-01',
    views: 0,
    ratings: { valeur: 4, complexite: 3, maturite: 5 },
    useCaseHtml: `<p>Sur les chantiers de Bouygues Travaux Publics, la détection et l'analyse des cycles opérationnels (cycles d'engins, phases de travaux, rotations logistiques) reposaient sur une expertise humaine et des règles métier manuelles, <strong>longues à définir et difficiles à maintenir</strong>.</p>
<p>By Cycle automatise cette détection par apprentissage machine, sans nécessiter de règles prédéfinies :</p>
<ul>
  <li>Ingestion de données capteurs et télématiques en temps réel via Databricks / AKS</li>
  <li>Détection automatique des ruptures de cycles avec l'algorithme <em>Ruptures</em></li>
  <li>Clustering des patterns opérationnels avec <em>KMeans</em> pour identifier les anomalies</li>
  <li>Tableaux de bord Management et Opérationnel pour le pilotage en temps réel et à la journée</li>
</ul>
<p>La solution est industrialisée et déployée en production sur des périmètres chantiers actifs.</p>`,
    valuesGainsHtml: `<p>By Cycle apporte une visibilité inédite sur la performance opérationnelle des chantiers :</p>
<ul>
  <li><strong>Réduction des coûts opérationnels</strong> grâce à la détection précoce des dérives de cycles</li>
  <li><strong>Amélioration de la planification</strong> par la compréhension fine des patterns d'activité</li>
  <li>Réduction des risques liés aux dérèglements non détectés (sécurité, délais, budget)</li>
  <li>Élimination des règles métier manuelles — l'IA s'adapte automatiquement aux nouveaux contextes chantier</li>
</ul>
<p>By Cycle est un exemple de l'approche data-driven appliquée aux opérations terrain, généralisable à d'autres entités de Bouygues Construction.</p>`,
    sidebarInfo: {
      filiale: [Filiale.TravauxPublics],
      cible: [SolutionCible.Management, SolutionCible.Operationnel],
      levierValeur: [
        SolutionLevierValeur.Productivite,
        SolutionLevierValeur.Risque,
      ],
      plateforme: 'Databricks, AKS',
      algorithmes: 'Ruptures, KMeans',
      phase: SolutionPhase.IND,
      cout: SolutionCost.Medium,
    },
  },
  {
    id: '7',
    slug: 'polyboost',
    title: 'PolyBoost',
    subtitle: 'Ingénierie / Devis',
    description:
      'Extraction et classification automatique de données de devis.',
    domain: 'Ingénierie / Devis',
    initiative: [InitiativeType.JournalIA],
    status: SolutionStatus.Active,
    labels: ['IA générative', 'ML'],
    keyFigures: [
      { label: 'Impact', value: 'Gain temps et fiabilité du chiffrage' },
    ],
    imageUrl: 'https://picsum.photos/id/119/800/600',
    lastModified: '2025-01-01',
    views: 0,
    ratings: { valeur: 4, complexite: 3, maturite: 2 },
    useCaseHtml: `<p>Les équipes de chiffrage de Bouygues Bâtiment France traitent des volumes importants de devis sous-traitants et fournisseurs. L'extraction manuelle des données de ces documents est <strong>chronophage, répétitive et source d'erreurs</strong>.</p>
<p>PolyBoost automatise ce processus d'extraction et de classification :</p>
<ul>
  <li>Ingestion de devis au format PDF ou image via OCR</li>
  <li>Extraction automatique des postes, quantités, prix unitaires et conditions par LLM</li>
  <li>Classification des lignes de devis selon la nomenclature interne</li>
  <li>Intégration des données structurées dans les outils de chiffrage existants</li>
</ul>
<p>Le POC est en cours sur des périmètres de chiffrage lot gros œuvre et second œuvre.</p>`,
    valuesGainsHtml: `<p>PolyBoost accélère et fiabilise le processus de chiffrage :</p>
<ul>
  <li><strong>Gain de temps significatif</strong> pour les métreurs et chargés d'affaires sur chaque consultation</li>
  <li><strong>Fiabilité accrue du chiffrage</strong> grâce à la réduction des erreurs de saisie et d'omission</li>
  <li>Possibilité de traiter un plus grand nombre de consultations simultanément</li>
  <li>Base de données structurée des devis historiques pour alimenter les modèles de référence</li>
</ul>
<p>Cette solution s'inscrit dans la digitalisation des processus de développement commercial et de chiffrage de Bouygues Bâtiment France.</p>`,
    sidebarInfo: {
      filiale: [Filiale.BatimentFrance],
      cible: [SolutionCible.Operationnel],
      levierValeur: [SolutionLevierValeur.Productivite],
      plateforme: 'Azure, OpenAI, Mistral',
      algorithmes: 'LLM, OCR, Classification',
      phase: SolutionPhase.POC,
      cout: SolutionCost.Medium,
    },
  },
  {
    id: '8',
    slug: 'bids-insights',
    title: 'Bids Insights',
    subtitle: 'Commercial / Pricing',
    description:
      "Analyse automatisée de la concurrence via données d'appels d'offres.",
    domain: 'Commercial / Pricing',
    initiative: [InitiativeType.JournalIA],
    status: SolutionStatus.Active,
    labels: ['IA générative'],
    keyFigures: [
      { label: 'Impact', value: 'Aide au positionnement concurrentiel' },
    ],
    imageUrl: 'https://picsum.photos/id/160/800/600',
    lastModified: '2025-01-01',
    views: 0,
    ratings: { valeur: 4, complexite: 2, maturite: 3 },
    useCaseHtml: `<p>Les équipes commerciales de Colas participent à de nombreux appels d'offres publics et privés. L'analyse des résultats de la concurrence (prix remis, écarts, stratégies) était réalisée <strong>manuellement et de façon non systématique</strong>, limitant la capacité à affiner le positionnement tarifaire.</p>
<p>Bids Insights automatise l'analyse concurrentielle à partir des données d'appels d'offres :</p>
<ul>
  <li>Collecte et structuration automatique des données de résultats d'appels d'offres</li>
  <li>Analyse des patterns de pricing concurrentiel par LLM via Azure et Power Automate</li>
  <li>Identification des zones géographiques et segments où Colas est sur/sous-positionné</li>
  <li>Rapport hebdomadaire automatisé pour les équipes commerciales</li>
</ul>
<p>La solution est en phase MVP avec un déploiement sur Colas France.</p>`,
    valuesGainsHtml: `<p>Bids Insights renforce la compétitivité commerciale de Colas :</p>
<ul>
  <li><strong>Aide au positionnement concurrentiel</strong> : décisions de pricing mieux informées sur chaque appel d'offres</li>
  <li><strong>Gain de productivité</strong> des équipes commerciales qui accèdent à une analyse structurée sans traitement manuel</li>
  <li>Augmentation du taux de conversion sur les appels d'offres ciblés</li>
  <li>Capitalisation sur les données historiques pour améliorer les modèles de prévision</li>
</ul>
<p>Bids Insights illustre comment l'IA générative peut transformer la stratégie commerciale en s'appuyant sur des données internes existantes.</p>`,
    sidebarInfo: {
      filiale: [Filiale.Colas],
      cible: [],
      levierValeur: [
        SolutionLevierValeur.Productivite,
        SolutionLevierValeur.Revenu,
      ],
      plateforme: 'Azure, Power Automate, OpenAI',
      algorithmes: 'LLM',
      phase: SolutionPhase.MVP,
      cout: SolutionCost.Medium,
    },
  },
  {
    id: '9',
    slug: 'tf1-tva',
    title: 'Contrôle TVA Notes de Frais',
    subtitle: 'Finance',
    description: 'Vérification automatique de TVA récupérable via OCR.',
    domain: 'Finance',
    initiative: [InitiativeType.JournalIA],
    status: SolutionStatus.Active,
    labels: ['OCR'],
    keyFigures: [{ label: 'Valeur', value: '+50k€', unit: '/an' }],
    imageUrl: 'https://picsum.photos/id/180/800/600',
    lastModified: '2025-01-01',
    views: 0,
    ratings: { valeur: 4, complexite: 1, maturite: 3 },
    useCaseHtml: `<p>Les équipes comptables de TF1 traitaient manuellement des milliers de notes de frais par an pour vérifier la récupérabilité de la TVA. Ce processus <strong>100% manuel</strong> engendrait des pertes financières dues aux TVA non récupérées par manque de vérification systématique.</p>
<p>Contrôle TVA Notes de Frais automatise cette vérification via OCR :</p>
<ul>
  <li>Scan et extraction automatique des informations fiscales (montants, taux TVA, numéros SIRET, dates) par IA OCR</li>
  <li>Vérification de la conformité TVA selon les règles fiscales françaises via des scripts Python</li>
  <li>Signalement automatique des anomalies et des TVA récupérables non déclarées</li>
  <li>Traitement en temps réel lors de la soumission des notes de frais</li>
</ul>
<p>La solution est déployée en MVP sur Azure et intégrée au processus de validation des notes de frais.</p>`,
    valuesGainsHtml: `<p>Contrôle TVA Notes de Frais génère une valeur financière directe et immédiate :</p>
<ul>
  <li><strong>+50 000 € récupérés par an</strong> grâce à la détection systématique de TVA récupérable non déclarée</li>
  <li><strong>Zéro effort supplémentaire</strong> pour les équipes comptables — la vérification est automatique</li>
  <li>Réduction du risque fiscal lié aux erreurs de déclaration TVA</li>
  <li>Traçabilité complète des vérifications pour les audits</li>
</ul>
<p>Ce cas d'usage démontre la capacité de l'OCR à générer un ROI mesurable et rapide sur des processus administratifs répétitifs.</p>`,
    sidebarInfo: {
      filiale: [Filiale.TF1],
      cible: [SolutionCible.Operationnel],
      levierValeur: [
        SolutionLevierValeur.Productivite,
        SolutionLevierValeur.Revenu,
      ],
      plateforme: 'Azure',
      algorithmes: 'IA OCR, Python',
      phase: SolutionPhase.MVP,
      cout: SolutionCost.Low,
    },
  },
  {
    id: '10',
    slug: 'lci-live-subtitles',
    title: 'Sous-titrage live LCI',
    subtitle: 'Média',
    description: 'Sous-titrage automatique temps réel pour diffusion live.',
    domain: 'Média',
    initiative: [InitiativeType.JournalIA],
    status: SolutionStatus.Active,
    labels: ['Speech-to-Text'],
    keyFigures: [{ label: 'Coût évité', value: '170k€', unit: '/an' }],
    imageUrl: 'https://picsum.photos/id/179/800/600',
    lastModified: '2025-01-01',
    views: 0,
    ratings: { valeur: 5, complexite: 2, maturite: 5 },
    useCaseHtml: `<p>LCI (La Chaîne Info) est soumise à des obligations légales de sous-titrage de ses émissions en direct. Le recours à des prestataires de sous-titrage humain représentait un <strong>coût élevé et des délais incompressibles</strong> incompatibles avec la réactivité exigée par l'information en continu.</p>
<p>Sous-titrage live LCI déploie une solution automatique temps réel basée sur la synthèse vocale :</p>
<ul>
  <li>Transcription audio en texte en temps réel par le moteur <em>Speechmatics</em></li>
  <li>Synchronisation automatique des sous-titres avec le flux vidéo live via Broadteam</li>
  <li>Prise en charge du vocabulaire journalistique, des noms propres et des termes techniques</li>
  <li>Disponible 24h/24, 7j/7 sans intervention humaine pour les émissions courantes</li>
</ul>
<p>La solution est industrialisée et en production sur les flux live de LCI.</p>`,
    valuesGainsHtml: `<p>Sous-titrage live LCI combine conformité réglementaire et performance économique :</p>
<ul>
  <li><strong>170 000 € de coûts évités par an</strong> en réduisant le recours aux prestataires de sous-titrage humain</li>
  <li><strong>Conformité réglementaire garantie</strong> en continu, sans dépendance à des prestataires externes</li>
  <li>Réactivité maximale pour le sous-titrage des breaking news et événements en direct</li>
  <li>Accessibilité accrue des contenus LCI pour les personnes sourdes et malentendantes</li>
</ul>
<p>Cette solution illustre comment l'IA Speech-to-Text peut adresser simultanément un enjeu de conformité et une opportunité d'économies substantielles.</p>`,
    sidebarInfo: {
      filiale: [Filiale.LCI],
      cible: [SolutionCible.Operationnel],
      levierValeur: [SolutionLevierValeur.Productivite],
      plateforme: 'Broadteam',
      algorithmes: 'Speechmatics',
      phase: SolutionPhase.IND,
      cout: SolutionCost.Medium,
    },
  },
  {
    id: '11',
    slug: 'aiquans',
    title: 'AIQuans',
    subtitle: "Appels d'offres",
    description:
      'Assistant IA pour qualifier rapidement les RFP et évaluer les risques.',
    domain: "Appels d'offres",
    initiative: [InitiativeType.JournalIA],
    status: SolutionStatus.Active,
    labels: ['IA générative'],
    keyFigures: [
      { label: 'Impact', value: 'Décisions plus rapides & moins risquées' },
    ],
    imageUrl: 'https://picsum.photos/id/133/800/600',
    lastModified: '2025-01-01',
    views: 0,
    ratings: { valeur: 5, complexite: 3, maturite: 3 },
    useCaseHtml: `<p>Les équipes commerciales d'Equans répondent à des dizaines de RFP (Request for Proposal) complexes chaque mois. L'analyse initiale de qualification — pertinence du projet, risques contractuels, capacité à répondre — prenait <strong>plusieurs jours par appel d'offres</strong> et mobilisait des experts seniors.</p>
<p>AIQuans est un assistant IA spécialisé dans la qualification rapide des RFP :</p>
<ul>
  <li>Ingestion et analyse automatique du document RFP par GPT-4o</li>
  <li>Recherche sémantique dans la base de connaissances interne via Azure AI Search</li>
  <li>Scoring automatique de la pertinence et des risques (contractuels, techniques, financiers)</li>
  <li>Génération d'un rapport de qualification structuré pour le comité de décision</li>
</ul>
<p>AIQuans est en phase MVP avec un déploiement actif sur Azure pour les équipes Management et Opérationnel d'Equans.</p>`,
    valuesGainsHtml: `<p>AIQuans accélère et sécurise les décisions de réponse aux appels d'offres :</p>
<ul>
  <li><strong>Décisions de qualification plus rapides</strong> — de plusieurs jours à quelques heures par RFP</li>
  <li><strong>Réduction du risque</strong> grâce à une détection systématique des clauses contractuelles problématiques</li>
  <li>Libération du temps des experts seniors pour se concentrer sur la rédaction des offres retenues</li>
  <li>Meilleure sélectivité : concentrer les efforts sur les appels d'offres avec le meilleur ratio gain/risque</li>
</ul>
<p>AIQuans s'inscrit dans la stratégie d'Equans de renforcer sa compétitivité commerciale par l'usage de l'IA générative sur des processus à haute valeur ajoutée.</p>`,
    sidebarInfo: {
      filiale: [Filiale.Equans],
      cible: [SolutionCible.Management, SolutionCible.Operationnel],
      levierValeur: [
        SolutionLevierValeur.Productivite,
        SolutionLevierValeur.Risque,
      ],
      plateforme: 'Azure',
      algorithmes: 'GPT-4o, Azure AI Search',
      phase: SolutionPhase.MVP,
      cout: SolutionCost.High,
    },
  },
  {
    id: '13',
    slug: 'tender-souvenir',
    title: 'Tender Souvenir',
    subtitle: "Appels d'offres",
    description:
      "Indexation fine des livrables techniques pour recherche contextuelle lors des appels d'offres.",
    domain: "Appels d'offres",
    initiative: [InitiativeType.JournalIA],
    status: SolutionStatus.Active,
    labels: ['Recherche augmentée', 'OCR'],
    keyFigures: [
      { label: 'Impact', value: 'Meilleur taux de réussite des AO' },
    ],
    imageUrl: 'https://picsum.photos/id/151/800/600',
    lastModified: '2025-01-01',
    views: 0,
    ratings: { valeur: 4, complexite: 3, maturite: 3 },
    useCaseHtml: `<p>Les équipes offres de Bouygues Travaux Publics produisent et s'appuient sur des milliers de livrables techniques lors des réponses aux appels d'offres. Retrouver une information précise (méthodologie, référence, prix unitaire) dans cette masse documentaire était <strong>long, aléatoire et peu capitalisé</strong>.</p>
<p>Tender Souvenir indexe finement l'ensemble des documents techniques pour permettre une recherche contextuelle :</p>
<ul>
  <li>Indexation au niveau paragraphe de chaque livrable technique (mémoires, plans, études)</li>
  <li>OCR des images, schémas et tableaux pour rendre leur contenu recherchable</li>
  <li>Recherche multi-critères combinant contexte projet, type de document et pertinence sémantique</li>
  <li>Capitalisation des retours d'expérience directement accessibles lors des nouvelles offres</li>
</ul>
<p>La solution est en phase MVP et déployée sur OpenSearch pour les équipes offres de Bouygues Travaux Publics.</p>`,
    valuesGainsHtml: `<p>Tender Souvenir améliore la qualité et la performance des équipes en réponse aux appels d'offres :</p>
<ul>
  <li><strong>Gain de temps significatif</strong> pour les équipes offres qui accèdent instantanément aux précédents pertinents</li>
  <li><strong>Capitalisation des retours d'expérience</strong> — chaque offre produite enrichit la base pour les suivantes</li>
  <li>Homogénéité des livrables techniques grâce à la réutilisation des meilleures formulations validées</li>
  <li>Amélioration du taux de réussite des appels d'offres par une meilleure qualité des réponses</li>
</ul>
<p>Tender Souvenir transforme des années de production documentaire en un actif stratégique exploitable, renforçant la compétitivité de Bouygues Travaux Publics sur les grands marchés.</p>`,
    sidebarInfo: {
      filiale: [Filiale.TravauxPublics],
      cible: [SolutionCible.Management, SolutionCible.Operationnel],
      levierValeur: [
        SolutionLevierValeur.Productivite,
        SolutionLevierValeur.Revenu,
      ],
      plateforme: 'OpenSearch',
      algorithmes: 'Indexation, OCR',
      phase: SolutionPhase.MVP,
      cout: SolutionCost.Medium,
    },
  },
  {
    id: '14',
    slug: 'eagle',
    title: 'EAGLE',
    subtitle: 'Maintenance ferroviaire',
    description:
      'Analyse automatisée des défauts de géométrie ferroviaire pour optimiser la maintenance des voies.',
    domain: 'Maintenance ferroviaire',
    initiative: [InitiativeType.JournalIA],
    status: SolutionStatus.Active,
    labels: ['Machine Learning'],
    keyFigures: [{ label: 'Temps économisés', value: '300h', unit: '/an' }],
    imageUrl: 'https://picsum.photos/id/173/800/600',
    lastModified: '2025-01-01',
    views: 0,
    ratings: { valeur: 4, complexite: 3, maturite: 3 },
    useCaseHtml: `<p>Colas Rail et Oc'Via Maintenance exploitent des wagons capteurs qui collectent en continu des données de géométrie de la voie ferrée. Le traitement manuel de ces données était <strong>long, partiellement exploité et peu adapté au suivi en temps réel</strong> de l'évolution des défauts.</p>
<p>EAGLE automatise l'analyse et la visualisation des défauts de géométrie ferroviaire :</p>
<ul>
  <li>Ingestion et correction automatique des données brutes issues des wagons capteurs</li>
  <li>Détection et classification des défauts géométriques (nivellement, dressage, voie) par modèles de Chaînes de Markov</li>
  <li>Tableau de bord de suivi de l'évolution des défauts dans le temps</li>
  <li>Planification prédictive des interventions de maintenance selon les niveaux d'alerte</li>
</ul>
<p>EAGLE est en phase MVP, déployé sur Azure et Python pour les équipes opérationnelles de Colas Rail.</p>`,
    valuesGainsHtml: `<p>EAGLE fiabilise l'analyse de la voie et optimise les plannings de maintenance :</p>
<ul>
  <li><strong>300 heures économisées par an</strong> grâce à l'automatisation du traitement des données capteurs</li>
  <li><strong>Amélioration de la qualité d'observation</strong> — meilleure détection des défauts émergents avant qu'ils n'atteignent les seuils critiques</li>
  <li>Meilleure planification des interventions pour réduire les indisponibilités de voie</li>
  <li>Réduction des coûts de maintenance corrective par anticipation des besoins</li>
</ul>
<p>EAGLE illustre comment le Machine Learning appliqué aux données capteurs peut transformer la maintenance ferroviaire d'un modèle correctif vers un modèle prédictif.</p>`,
    sidebarInfo: {
      filiale: [Filiale.Colas],
      cible: [SolutionCible.Operationnel],
      levierValeur: [
        SolutionLevierValeur.Productivite,
        SolutionLevierValeur.Risque,
      ],
      plateforme: 'Azure, Python',
      algorithmes: 'Chaînes de Markov',
      phase: SolutionPhase.MVP,
      cout: SolutionCost.Medium,
    },
  },
  {
    id: '15',
    slug: 'opticargos',
    title: 'Opticargos',
    subtitle: 'Transport / Logistique',
    description:
      'Optimisation automatique des plans de transport maritime de bitume pour maximiser la marge et la disponibilité des navires.',
    domain: 'Transport / Logistique',
    initiative: [InitiativeType.JournalIA],
    status: SolutionStatus.Active,
    labels: ['Optimisation algorithmique'],
    keyFigures: [{ label: 'Impact', value: 'Optimisation flotte & marge' }],
    imageUrl: 'https://picsum.photos/id/164/800/600',
    lastModified: '2025-01-01',
    views: 0,
    ratings: { valeur: 4, complexite: 4, maturite: 3 },
    useCaseHtml: `<p>Continental Bitumen Ltd. (filiale Colas) gère une flotte de navires pour le transport maritime de bitume à l'échelle internationale. La planification des plans de transport reposait sur des <strong>essais successifs manuels, peu optimisés</strong>, laissant des marges de rentabilité inexploitées.</p>
<p>Opticargos calcule automatiquement des plans de transport maritimes optimisés :</p>
<ul>
  <li>Modélisation de l'ensemble des contraintes opérationnelles (ports, navires, délais, capacités)</li>
  <li>Optimisation globale par solveur Hexaly pour maximiser simultanément la marge et l'utilisation des navires</li>
  <li>Recalcul à la demande pour s'adapter aux événements perturbateurs (météo, pannes, urgences client)</li>
  <li>Comparaison automatique des scénarios pour faciliter les décisions logistiques</li>
</ul>
<p>Opticargos est en phase MVP avec un déploiement actif pour les planificateurs de Continental Bitumen Ltd.</p>`,
    valuesGainsHtml: `<p>Opticargos améliore la rentabilité opérationnelle de la flotte maritime :</p>
<ul>
  <li><strong>Amélioration de la marge globale</strong> grâce à des plans de chargement et de routing optimisés</li>
  <li><strong>Meilleure disponibilité des navires</strong> par une utilisation plus efficace des capacités de la flotte</li>
  <li>Réactivité accrue face aux imprévus — recalcul d'un plan optimal en quelques minutes</li>
  <li>Réduction des coûts d'exploitation (carburant, port fees) par optimisation des routes et calendriers</li>
</ul>
<p>Opticargos démontre la puissance de l'optimisation algorithmique sur des problèmes logistiques complexes à haute valeur financière.</p>`,
    sidebarInfo: {
      filiale: [Filiale.Colas],
      cible: [SolutionCible.Operationnel],
      levierValeur: [
        SolutionLevierValeur.Revenu,
        SolutionLevierValeur.Productivite,
      ],
      plateforme: 'Hexaly',
      algorithmes: 'Optimiseur',
      phase: SolutionPhase.MVP,
      cout: SolutionCost.High,
    },
  },
  {
    id: '16',
    slug: 'centre-services-intelligent',
    title: 'Centre de Services Intelligent',
    subtitle: 'Support IT',
    description:
      'Agent vocal IA autonome pour résoudre les demandes IT de premier niveau sans intervention humaine.',
    domain: 'Support IT',
    initiative: [InitiativeType.JournalIA],
    status: SolutionStatus.Active,
    labels: ['IA générative', 'IA vocale'],
    keyFigures: [
      { label: 'Appels résolus', value: '54', unit: '%' },
      { label: 'Durée', value: '10 min → 2 min', unit: '/appel' },
    ],
    imageUrl: 'https://picsum.photos/id/160/800/600',
    lastModified: '2024-01-01',
    views: 0,
    ratings: { valeur: 5, complexite: 4, maturite: 5 },
    useCaseHtml: `<p>Le centre de support IT d'Equans France traitait un volume élevé d'appels de premier niveau pour des demandes répétitives (réinitialisation de mot de passe, accès applicatif, problèmes de connexion). Cette surcharge mobilisait les techniciens sur des tâches à faible valeur ajoutée et <strong>allongeait les délais de traitement</strong> pour tous les utilisateurs.</p>
<p>Le Centre de Services Intelligent est un agent vocal IA capable de résoudre ces demandes de façon autonome :</p>
<ul>
  <li>Compréhension vocale naturelle des demandes utilisateurs via GPT-4o et Azure Communication Services</li>
  <li>Résolution automatique des demandes standard (reset MDP, déverrouillage compte, accès applicatif)</li>
  <li>Escalade intelligente vers un technicien humain pour les cas complexes, avec résumé automatique du contexte</li>
  <li>Disponible en temps réel, 24h/24, sur l'ensemble du périmètre Equans France</li>
</ul>
<p>La solution est industrialisée et en production, traitant l'ensemble des appels de premier niveau du support IT.</p>`,
    valuesGainsHtml: `<p>Le Centre de Services Intelligent transforme l'efficacité du support IT d'Equans :</p>
<ul>
  <li><strong>54 % des appels résolus de façon autonome</strong> sans intervention d'un technicien humain</li>
  <li><strong>Durée par appel réduite de 10 à 2 minutes</strong> — expérience utilisateur considérablement améliorée</li>
  <li>Forte réduction de la charge des équipes support qui se concentrent sur les incidents complexes</li>
  <li>Disponibilité 24h/24 et 7j/7, éliminant les temps d'attente aux heures de pointe</li>
</ul>
<p>Ce cas d'usage illustre comment l'IA vocale peut industrialiser le support IT en combinant performance économique et amélioration de l'expérience collaborateur.</p>`,
    sidebarInfo: {
      filiale: [Filiale.Equans],
      cible: [SolutionCible.Operationnel],
      levierValeur: [
        SolutionLevierValeur.Productivite,
        SolutionLevierValeur.Risque,
      ],
      plateforme: 'Azure, Azure Communication Services',
      algorithmes: 'GPT-4o',
      phase: SolutionPhase.IND,
      cout: SolutionCost.High,
    },
  },
  {
    id: '12',
    slug: 'equansgpt',
    title: 'EquansGPT',
    subtitle: 'Support interne',
    description: 'Assistant conversationnel interne multi-documents.',
    domain: 'Support interne',
    initiative: [InitiativeType.JournalIA],
    status: SolutionStatus.Active,
    labels: ['IA générative'],
    keyFigures: [
      { label: 'Impact', value: "Accès rapide à l'information interne" },
    ],
    imageUrl: 'https://picsum.photos/id/145/800/600',
    lastModified: '2024-01-01',
    views: 0,
    ratings: { valeur: 3, complexite: 2, maturite: 5 },
    useCaseHtml: `<p>Les collaborateurs d'Equans Belux devaient naviguer dans de multiples systèmes documentaires (procédures internes, guides techniques, politiques RH, etc.) pour trouver des réponses à leurs questions opérationnelles quotidiennes. Ce processus était <strong>fragmenté, chronophage et souvent infructueux</strong>.</p>
<p>EquansGPT est un assistant conversationnel interne basé sur GPT-4o :</p>
<ul>
  <li>Interface de chat unifiée donnant accès à l'ensemble de la base documentaire interne</li>
  <li>Recherche multi-documents avec synthèse contextuelle par GPT-4o</li>
  <li>Réponses sourcées avec références aux documents originaux pour vérification</li>
  <li>Disponible en temps réel sur Azure pour tous les collaborateurs Equans Belux</li>
</ul>
<p>La solution est industrialisée et en usage quotidien par les équipes opérationnelles.</p>`,
    valuesGainsHtml: `<p>EquansGPT améliore significativement la productivité et l'expérience collaborateur :</p>
<ul>
  <li><strong>Accès immédiat à l'information interne</strong> — les collaborateurs trouvent leurs réponses en quelques secondes au lieu de plusieurs minutes ou heures</li>
  <li><strong>Réduction de la charge des équipes support</strong> (RH, IT, juridique) dont le volume de questions répétitives diminue</li>
  <li>Meilleure application des procédures internes grâce à un accès facilité</li>
  <li>Capitalisation sur la connaissance collective — les documents existants deviennent un actif exploitable</li>
</ul>
<p>EquansGPT est un point d'entrée vers une transformation plus large de la gestion des connaissances chez Equans, avec un potentiel d'extension à d'autres entités du groupe.</p>`,
    sidebarInfo: {
      filiale: [Filiale.Equans],
      cible: [SolutionCible.Operationnel],
      levierValeur: [SolutionLevierValeur.Productivite],
      plateforme: 'Azure',
      algorithmes: 'GPT-4o',
      phase: SolutionPhase.IND,
      cout: SolutionCost.Medium,
    },
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: '101',
    slug: 'grand-paris-express',
    title: 'Grand Paris Express',
    location: 'Paris, France',
    client: 'Société du Grand Paris',
    description:
      'Construction of the new Line 15 South, featuring sustainable tunnel boring technologies.',
    imageUrl: 'https://picsum.photos/id/76/800/600',
    relatedSolutions: ['1', '3'],
    views: 8900,
  },
  {
    id: '102',
    slug: 'singapore-port-expansion',
    title: 'Tuas Mega Port',
    location: 'Singapore',
    client: 'PSA International',
    description:
      'Reclamation and infrastructure development for the next generation automated port.',
    imageUrl: 'https://picsum.photos/id/184/800/600',
    relatedSolutions: ['2'],
    views: 4500,
  },
];

export const MOCK_BLOG: BlogPost[] = [
  {
    id: '201',
    slug: 'future-of-urban-mobility',
    title: 'The Future of Urban Mobility',
    excerpt:
      'How autonomous pods and green corridors are reshaping our city landscapes.',
    author: 'Jean Dupont',
    date: '2023-10-15',
    category: 'Innovation',
    imageUrl: 'https://picsum.photos/id/188/800/600',
  },
  {
    id: '202',
    slug: 'decarbonizing-construction',
    title: 'Decarbonizing Heavy Construction',
    excerpt:
      'Strategies for reducing the carbon footprint of massive infrastructure projects.',
    author: 'Marie Curie',
    date: '2023-11-02',
    category: 'Sustainability',
    imageUrl: 'https://picsum.photos/id/201/800/600',
  },
];

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@bouygues.com',
    entity: 'Corporate',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-03-15 09:30',
  },
  {
    id: 'u2',
    name: 'Editor Sarah',
    email: 'sarah@bouygues.com',
    entity: 'Construction',
    role: 'Editor',
    status: 'Active',
    lastLogin: '2024-03-14 14:15',
  },
  {
    id: 'u3',
    name: 'Viewer Tom',
    email: 'tom@bouygues.com',
    entity: 'Energies',
    role: 'Viewer',
    status: 'Inactive',
    lastLogin: '2024-02-28 10:00',
  },
];

export const MOCK_LOGS: AuditLog[] = [
  {
    id: 'l1',
    user: 'Admin User',
    action: 'Login',
    target: 'System',
    timestamp: '2024-03-15 09:30',
  },
  {
    id: 'l2',
    user: 'Editor Sarah',
    action: 'Update',
    target: 'EcoConcrete Pro',
    timestamp: '2024-03-14 14:20',
    details: 'Updated key figures',
  },
  {
    id: 'l3',
    user: 'Admin User',
    action: 'Create',
    target: 'New User (Tom)',
    timestamp: '2024-02-28 09:00',
  },
  {
    id: 'l4',
    user: 'Editor Sarah',
    action: 'Create',
    target: 'Green Aero HVAC',
    timestamp: '2024-02-25 11:30',
  },
];
