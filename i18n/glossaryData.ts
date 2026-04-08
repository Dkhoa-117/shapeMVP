export interface GlossaryTerm {
  term: { en: string; fr: string };
  acronym?: string;
  definition: { en: string; fr: string };
}

export interface GlossaryGroup {
  letter: string;
  terms: GlossaryTerm[];
}

export const GLOSSARY_DATA_BILINGUAL: GlossaryGroup[] = [
  {
    letter: 'C',
    terms: [
      {
        term: { fr: 'Chatbot', en: 'Chatbot' },
        definition: {
          fr: "Est un programme informatique qui simule et traite une conversation humaine (écrite ou parlée), permettant aux humains d'interagir avec des terminaux digitaux comme s'ils communiquaient avec une personne réelle. Les chatbots peuvent être aussi simples que des programmes rudimentaires répondant à une requête simple avec une réponse sur une seule ligne, ou aussi sophistiqués que des assistants digitaux qui apprennent et évoluent pour fournir des niveaux de personnalisation croissants à mesure qu'ils collectent et traitent des informations.",
          en: 'A computer program that simulates and processes human conversation (written or spoken), allowing humans to interact with digital devices as if they were communicating with a real person. Chatbots can range from simple programs that answer a single question with a one-line response, to sophisticated digital assistants that learn and evolve to deliver increasing levels of personalization as they collect and process information.',
        },
      },
      {
        term: { fr: 'Computer Vision', en: 'Computer Vision' },
        definition: {
          fr: "Domaine de l'intelligence artificielle qui permet aux ordinateurs de comprendre et d'interpréter le contenu visuel du monde réel, comme des images et des vidéos.",
          en: 'A field of artificial intelligence that enables computers to understand and interpret visual content from the real world, such as images and videos.',
        },
      },
      {
        term: { fr: 'Corpus Documentaire', en: 'Document Corpus' },
        definition: {
          fr: "Ensemble de documents utilisés comme base de données pour la recherche ou l'analyse.",
          en: 'A collection of documents used as a database for research or analysis.',
        },
      },
    ],
  },
  {
    letter: 'D',
    terms: [
      {
        term: { fr: 'Data Science', en: 'Data Science' },
        definition: {
          fr: 'Discipline qui combine des méthodes scientifiques, des algorithmes, des processus et des systèmes pour extraire des connaissances et des insights à partir de données structurées et non structurées. Elle englobe des techniques de statistiques, de machine learning, de data mining et de visualisation de données pour analyser et interpréter des données complexes.',
          en: 'A discipline that combines scientific methods, algorithms, processes, and systems to extract knowledge and insights from structured and unstructured data. It encompasses techniques from statistics, machine learning, data mining, and data visualization to analyze and interpret complex data.',
        },
      },
      {
        term: { fr: 'Deep Learning', en: 'Deep Learning' },
        definition: {
          fr: "Sous-domaine du machine learning qui utilise des réseaux de neurones artificiels composés de nombreuses couches (profondes) pour modéliser des abstractions de données de haut niveau. Le deep learning est particulièrement efficace pour les tâches complexes telles que la reconnaissance d'images, la traduction automatique, et la reconnaissance vocale.",
          en: 'A sub-domain of machine learning that uses artificial neural networks composed of many layers (deep) to model high-level data abstractions. Deep learning is particularly effective for complex tasks such as image recognition, machine translation, and speech recognition.',
        },
      },
    ],
  },
  {
    letter: 'E',
    terms: [
      {
        term: { fr: 'EDA', en: 'EDA' },
        acronym: 'Exploratory Data Analysis',
        definition: {
          fr: "Approche d'analyse des données qui utilise des techniques visuelles et statistiques pour découvrir des patterns, détecter des anomalies et vérifier des hypothèses avant la modélisation formelle.",
          en: 'A data analysis approach that uses visual and statistical techniques to discover patterns, detect anomalies, and verify hypotheses before formal modeling.',
        },
      },
    ],
  },
  {
    letter: 'F',
    terms: [
      {
        term: { fr: 'Few-Shot Prompting', en: 'Few-Shot Prompting' },
        definition: {
          fr: "Technique d'IA qui consiste à donner quelques exemples à un modèle de langage pour lui apprendre à effectuer une tâche, sans entraînement supplémentaire.",
          en: 'An AI technique that involves giving a language model a few examples to teach it to perform a task, without additional training.',
        },
      },
    ],
  },
  {
    letter: 'G',
    terms: [
      {
        term: { fr: 'GPT', en: 'GPT' },
        acronym: 'Generative Pre-Trained Transformer',
        definition: {
          fr: 'Grand modèle linguistique (LLM) développé par Open AI. En 2024, OpenAI a sorti sa quatrième génération GPT-4 et sa version IA multimodal GPT-4O.',
          en: 'A large language model (LLM) developed by OpenAI. In 2024, OpenAI released its fourth generation GPT-4 and its multimodal AI version GPT-4O.',
        },
      },
      {
        term: { fr: 'Gradient Boosting', en: 'Gradient Boosting' },
        acronym: 'GBT',
        definition: {
          fr: "Méthode d'apprentissage automatique qui construit un modèle puissant en combinant plusieurs arbres de décision simples, ajoutés les uns après les autres, où chaque nouvel arbre corrige les erreurs des précédents.",
          en: 'A machine learning method that builds a powerful model by combining several simple decision trees, added one after another, where each new tree corrects the errors of the previous ones.',
        },
      },
    ],
  },
  {
    letter: 'I',
    terms: [
      {
        term: { fr: 'IA Agentique', en: 'Agentic AI' },
        definition: {
          fr: "Intelligence Artificielle basée sur des agents autonomes capables de percevoir leur environnement, de raisonner et d'agir de manière autonome pour atteindre des objectifs.",
          en: 'Artificial Intelligence based on autonomous agents capable of perceiving their environment, reasoning, and acting autonomously to achieve objectives.',
        },
      },
      {
        term: { fr: 'IA Générative', en: 'Generative AI' },
        definition: {
          fr: "L'Intelligence Artificielle Générative, ou IA générative, est une branche de l'IA qui se concentre sur la génération de nouvelles données. À la différence de l'IA traditionnelle, qui peut avoir plusieurs usages, l'IA générative vise à générer des données, textes, images, ou même vidéos, de manière autonome.",
          en: 'Generative Artificial Intelligence, or Generative AI, is a branch of AI that focuses on generating new data. Unlike traditional AI, which can have multiple uses, generative AI aims to autonomously generate data, texts, images, or even videos.',
        },
      },
      {
        term: { fr: 'IA Multimodale', en: 'Multimodal AI' },
        definition: {
          fr: "Technologie d'intelligence artificielle capable de traiter et d'intégrer des informations provenant de différentes sources de données, telles que le texte, les images, le son, et la vidéo, pour comprendre et générer des réponses ou des actions de manière plus contextuelle et cohérente. Par exemple, une IA multimodale peut analyser simultanément une image et son descriptif textuel pour fournir une interprétation plus précise.",
          en: 'Artificial intelligence technology capable of processing and integrating information from different data sources, such as text, images, sound, and video, to understand and generate responses or actions in a more contextual and coherent manner. For example, multimodal AI can simultaneously analyze an image and its textual description to provide a more precise interpretation.',
        },
      },
    ],
  },
  {
    letter: 'L',
    terms: [
      {
        term: { fr: 'Light GBM', en: 'Light GBM' },
        definition: {
          fr: "Est une implémentation d'arbres de décision à gradient boosté (GBDT) créée par des chercheurs de Microsoft. Elle est conçue pour être distribuée et efficace, avec des avantages tels qu'une vitesse de training plus rapide et une plus grande efficacité.",
          en: 'An implementation of gradient boosted decision trees (GBDT) created by Microsoft researchers. It is designed to be distributed and efficient, with advantages such as faster training speed and greater efficiency.',
        },
      },
      {
        term: { fr: 'LLaMA', en: 'LLaMA' },
        acronym: 'Large Language Model Meta AI',
        definition: {
          fr: 'Grand modèle linguistique (LLM) développé par Méta. En 2024, Méta a sorti sa troisième génération : LlaMA3.',
          en: 'A large language model (LLM) developed by Meta. In 2024, Meta released its third generation: LLaMA3.',
        },
      },
      {
        term: { fr: 'LLM', en: 'LLM' },
        acronym: 'Large Language Model',
        definition: {
          fr: 'Grand modèle linguistique basé sur des architectures de réseaux de neurones, permettant, entre autres, le traitement naturel du langage (NLP). Cela permet en particulier de comprendre et de générer des textes humains.',
          en: 'A large language model based on neural network architectures, enabling, among other things, natural language processing (NLP). This allows in particular the understanding and generation of human text.',
        },
      },
    ],
  },
  {
    letter: 'M',
    terms: [
      {
        term: { fr: 'Machine Learning', en: 'Machine Learning' },
        definition: {
          fr: "Branche de l'intelligence artificielle (IA) qui permet aux systèmes informatiques d'apprendre et de s'améliorer automatiquement à partir de l'expérience sans être explicitement programmés. Le machine learning utilise des algorithmes et des modèles statistiques pour analyser des données, identifier des modèles et faire des prédictions ou des décisions basées sur les données.",
          en: 'A branch of artificial intelligence (AI) that allows computer systems to learn and improve automatically from experience without being explicitly programmed. Machine learning uses algorithms and statistical models to analyze data, identify patterns, and make predictions or data-based decisions.',
        },
      },
      {
        term: { fr: 'MCP', en: 'MCP' },
        acronym: 'Model Context Protocol',
        definition: {
          fr: "Protocole qui standardise l'intégration des agents d'IA en entreprise. Il définit un cadre modulaire basé sur trois éléments — outils (API, fonctions, scripts), dialogue (HTTP/SSE) et échanges (JSON RPC) — pour assurer pluggabilité, découvrabilité et composabilité. MCP facilite ainsi l'interopérabilité et l'adoption professionnelle des systèmes d'IA agentiques.",
          en: 'A protocol that standardizes the integration of AI agents in enterprise. It defines a modular framework based on three elements — tools (API, functions, scripts), dialogue (HTTP/SSE), and exchanges (JSON RPC) — to ensure pluggability, discoverability, and composability. MCP thus facilitates interoperability and professional adoption of agentic AI systems.',
        },
      },
      {
        term: { fr: 'MFA', en: 'MFA' },
        acronym: 'Authentification Multifacteur',
        definition: {
          fr: "Méthode de sécurité qui demande plusieurs preuves d'identité (comme un mot de passe et un code envoyé au téléphone) pour accéder à un compte.",
          en: 'A security method that requires multiple proofs of identity (such as a password and a code sent to your phone) to access an account.',
        },
      },
      {
        term: { fr: 'Mistral', en: 'Mistral' },
        definition: {
          fr: 'Grand modèle linguistique (LLM) développé par Mistral AI, entreprise française.',
          en: 'A large language model (LLM) developed by Mistral AI, a French company.',
        },
      },
      {
        term: { fr: 'Modèle Text-to-Text', en: 'Text-to-Text Model' },
        definition: {
          fr: 'Type de modèle de traitement du langage naturel (NLP) qui prend un texte en entrée et génère un texte en sortie. Il est utilisé pour diverses tâches telles que la traduction automatique, le résumé de texte, la génération de réponses, et la reformulation de phrases.',
          en: 'A type of natural language processing (NLP) model that takes text as input and generates text as output. It is used for various tasks such as machine translation, text summarization, answer generation, and sentence reformulation.',
        },
      },
    ],
  },
  {
    letter: 'N',
    terms: [
      {
        term: { fr: 'NLP', en: 'NLP' },
        acronym: 'Natural Language Processing',
        definition: {
          fr: "Domaine multidisciplinaire impliquant la linguistique, l'informatique et l'intelligence artificielle qui vise à créer des outils de traitement du langage naturel pour de multiples applications comme la traduction automatique.",
          en: 'A multidisciplinary field involving linguistics, computer science, and artificial intelligence that aims to create natural language processing tools for multiple applications such as machine translation.',
        },
      },
    ],
  },
  {
    letter: 'O',
    terms: [
      {
        term: { fr: 'OCR', en: 'OCR' },
        definition: {
          fr: 'Technologie qui permet de convertir du texte imprimé ou manuscrit présent dans une image ou un document scanné en texte numérique modifiable.',
          en: 'Technology that converts printed or handwritten text present in an image or scanned document into editable digital text.',
        },
      },
      {
        term: { fr: 'Open Data', en: 'Open Data' },
        definition: {
          fr: "Données accessibles librement et gratuitement à tous, sans restriction de droits d'auteur ou de licence.",
          en: 'Data that is freely accessible and available to everyone, without copyright or licensing restrictions.',
        },
      },
    ],
  },
  {
    letter: 'R',
    terms: [
      {
        term: { fr: 'RAG', en: 'RAG' },
        acronym: 'Retrieval-Augmented Generation',
        definition: {
          fr: "Combine extraction d'informations et IA générative pour fournir des réponses fiables, contextuelles et précises. En 2024, basé sur des données actualisées, il optimise les performances dans des domaines tels que le service client, la recherche et l'aide à la décision.",
          en: 'Combines information retrieval and generative AI to provide reliable, contextual, and precise responses. In 2024, based on up-to-date data, it optimizes performance in areas such as customer service, research, and decision support.',
        },
      },
      {
        term: { fr: 'Référencement', en: 'SEO' },
        acronym: 'SEO',
        definition: {
          fr: "Ensemble de techniques visant à améliorer la visibilité et le classement d'un site web dans les résultats des moteurs de recherche.",
          en: "A set of techniques aimed at improving a website's visibility and ranking in search engine results.",
        },
      },
      {
        term: { fr: 'Régression Lasso', en: 'Lasso Regression' },
        definition: {
          fr: 'Méthode de régression linéaire qui ajoute une pénalité favorisant des coefficients exactement nuls, ce qui permet aussi de sélectionner automatiquement les variables les plus importantes.',
          en: 'A linear regression method that adds a penalty favoring exactly zero coefficients, which also allows automatic selection of the most important variables.',
        },
      },
      {
        term: { fr: 'Régression Ridge', en: 'Ridge Regression' },
        definition: {
          fr: 'Méthode de régression linéaire qui ajoute une pénalité sur la taille des coefficients pour éviter le surapprentissage, en les réduisant sans les annuler.',
          en: 'A linear regression method that adds a penalty on the size of coefficients to avoid overfitting, reducing them without zeroing them out.',
        },
      },
    ],
  },
  {
    letter: 'S',
    terms: [
      {
        term: { fr: 'Série Temporelle', en: 'Time Series' },
        definition: {
          fr: "Est une suite de valeurs numériques représentant l'évolution d'une quantité spécifique au cours du temps. De telles suites de variables aléatoires peuvent être exprimées mathématiquement afin d'en analyser le comportement, généralement pour comprendre son évolution passée et pour en prévoir le comportement futur. Une telle transposition mathématique utilise le plus souvent des concepts de probabilités et de statistique.",
          en: 'A sequence of numerical values representing the evolution of a specific quantity over time. Such sequences of random variables can be expressed mathematically to analyze their behavior, generally to understand past evolution and forecast future behavior. Such mathematical transposition most often uses concepts from probability and statistics.',
        },
      },
      {
        term: { fr: 'Signaux Faibles', en: 'Weak Signals' },
        definition: {
          fr: "Indices précurseurs ou petites anomalies dans les données qui peuvent indiquer le début d'un problème ou d'une tendance. Ils sont souvent difficiles à détecter mais peuvent fournir des informations précieuses pour anticiper des événements futurs ou des changements dans un système.",
          en: 'Precursor indicators or small anomalies in data that may indicate the beginning of a problem or trend. They are often difficult to detect but can provide valuable information for anticipating future events or changes in a system.',
        },
      },
      {
        term: { fr: 'Speechmatics', en: 'Speechmatics' },
        definition: {
          fr: 'Entreprise spécialisée dans la reconnaissance vocale automatique, offrant des solutions pour transcrire automatiquement la parole en texte dans de nombreuses langues.',
          en: 'A company specializing in automatic speech recognition, offering solutions to automatically transcribe speech into text in many languages.',
        },
      },
    ],
  },
  {
    letter: 'T',
    terms: [
      {
        term: { fr: 'Traçabilité', en: 'Traceability' },
        definition: {
          fr: "Capacité à suivre la progression d'un produit ou d'une information à travers toutes les étapes de production, de transformation et de distribution.",
          en: 'The ability to track the progress of a product or information through all stages of production, processing, and distribution.',
        },
      },
    ],
  },
];
