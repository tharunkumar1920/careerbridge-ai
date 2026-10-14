export interface SkillGapItem {
  name: string;
  current: number;
  required: number;
  gap: number;
  status: 'critical' | 'moderate' | 'optimal';
  category: string;
}

export interface RoadmapMilestone {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  status: 'completed' | 'active' | 'upcoming';
  duration: string;
  tags: string[];
  deliverable: string;
  description: string;
  aiRecommendation: string;
}

export interface OpportunityItem {
  id: string;
  role: string;
  company: string;
  location: string;
  type: string;
  matchScore: number;
  category: string;
  logoColor: string;
  matchedSkills: string[];
  recommendedToLearn: string[];
  whyMatch: string;
  salaryRange: string;
}

export interface NetworkNode {
  id: string;
  label: string;
  role: string;
  connections: string[];
  color: string;
}

export const HERO_TAGS = ['Skills', 'Goals', 'Learning', 'Opportunities'];

export const NETWORK_NODES: NetworkNode[] = [
  { id: 'skills', label: 'Skills', role: 'Verified Competencies', connections: ['goals', 'learning'], color: '#A78BFA' },
  { id: 'goals', label: 'Goals', role: 'Target: AI/ML Engineer', connections: ['learning', 'projects'], color: '#38BDF8' },
  { id: 'learning', label: 'Learning', role: 'Adaptive Curricula', connections: ['projects', 'internships'], color: '#818CF8' },
  { id: 'projects', label: 'Projects', role: 'Real-world Proofs', connections: ['internships', 'jobs'], color: '#34D399' },
  { id: 'internships', label: 'Internships', role: 'Applied Experience', connections: ['jobs', 'recruiters'], color: '#F472B6' },
  { id: 'jobs', label: 'Jobs', role: 'High-Growth Placements', connections: ['recruiters', 'skills'], color: '#FBBF24' },
  { id: 'recruiters', label: 'Recruiters', role: 'Direct AI Sourcing', connections: ['skills', 'goals'], color: '#60A5FA' },
];

export const CAREER_PROFILE = {
  studentName: 'Alex Rivera',
  university: 'Stanford University (BS Computer Science, Class of 2026)',
  targetRole: 'AI / Machine Learning Engineer',
  careerAlignment: 68,
  confidenceScore: 94,
  marketDemandTrend: '+34% YoY',
  projectedTimeline: '4.5 months to full readiness',
};

export const SKILL_GAPS: SkillGapItem[] = [
  { name: 'Machine Learning Fundamentals', current: 62, required: 90, gap: 28, status: 'moderate', category: 'Core ML' },
  { name: 'Deep Learning & PyTorch', current: 48, required: 85, gap: 37, status: 'critical', category: 'Deep Learning' },
  { name: 'Data Structures & Algorithms', current: 43, required: 80, gap: 37, status: 'critical', category: 'Computer Science' },
  { name: 'Cloud Infrastructure & MLOps', current: 21, required: 75, gap: 54, status: 'critical', category: 'Engineering' },
  { name: 'Python Systems & Vectorization', current: 88, required: 90, gap: 2, status: 'optimal', category: 'Programming' },
];

export interface SubSkill {
  name: string;
  current: number;
  required: number;
  proof: string;
}

export interface DetailedSkillGapItem {
  id: string;
  name: string;
  category: string;
  current: number;
  required: number;
  cohortMedian: number;
  simulatedScore?: number;
  gap: number;
  status: 'critical' | 'moderate' | 'optimal';
  priority: 'High' | 'Medium' | 'Low';
  verifiedProofs: string[];
  subSkills: SubSkill[];
  recommendation: string;
}

export interface RadarAxis {
  axis: string;
  current: number;
  required: number;
  cohort: number;
  simulated?: number;
}

export interface RoleAnalyticsProfile {
  id: string;
  title: string;
  tagline: string;
  demandTrend: string;
  postingsCount: number;
  alignmentScore: number;
  simulatedAlignmentScore: number;
  projectedTimeline: string;
  simulatedTimeline: string;
  percentile: number;
  velocityHrsWeek: number;
  interviewProbability: number;
  simulatedInterviewProbability: number;
  salaryIntern: string;
  salaryGrad: string;
  topSkillsDemand: { name: string; percentage: number }[];
  radarAxes: RadarAxis[];
  skills: DetailedSkillGapItem[];
  simulationDescription: string;
  simulatedSkillId: string;
}

export const ROLE_ANALYTICS_DATA: Record<string, RoleAnalyticsProfile> = {
  'ai-ml': {
    id: 'ai-ml',
    title: 'AI / Machine Learning Engineer',
    tagline: 'Perception, Deep Architectures & Statistical Learning',
    demandTrend: '+34% YoY Hiring Volume',
    postingsCount: 1840,
    alignmentScore: 68,
    simulatedAlignmentScore: 79,
    projectedTimeline: '4.5 Months',
    simulatedTimeline: '3.2 Months',
    percentile: 86,
    velocityHrsWeek: 12.5,
    interviewProbability: 76,
    simulatedInterviewProbability: 89,
    salaryIntern: '$52 – $65 / hr',
    salaryGrad: '$135k – $175k Base',
    topSkillsDemand: [
      { name: 'PyTorch / Tensor Compute', percentage: 92 },
      { name: 'Scikit-Learn & Optimization', percentage: 85 },
      { name: 'MLOps, Docker & Serving', percentage: 74 },
      { name: 'CUDA / C++ Acceleration', percentage: 68 },
    ],
    simulationDescription: 'Sprint 04: Distributed PyTorch & Transformer Fine-tuning (+32 hrs logged). Closes Deep Learning gap from 37% to 3%.',
    simulatedSkillId: 'deep-learning',
    radarAxes: [
      { axis: 'ML Foundations', current: 62, required: 90, cohort: 54, simulated: 62 },
      { axis: 'Deep Learning', current: 48, required: 85, cohort: 42, simulated: 82 },
      { axis: 'Algorithms & DSA', current: 43, required: 80, cohort: 58, simulated: 43 },
      { axis: 'Cloud & MLOps', current: 21, required: 75, cohort: 31, simulated: 21 },
      { axis: 'Python Systems', current: 88, required: 90, cohort: 66, simulated: 88 },
      { axis: 'Model Serving', current: 55, required: 82, cohort: 45, simulated: 65 },
    ],
    skills: [
      {
        id: 'ml-fundamentals',
        name: 'Machine Learning Fundamentals',
        category: 'Core ML',
        current: 62,
        required: 90,
        cohortMedian: 54,
        gap: 28,
        status: 'moderate',
        priority: 'High',
        verifiedProofs: ['2 GitHub Repositories Verified', '8 Coding Benchmarks Passed'],
        recommendation: 'Master regularized loss formulations, Adam optimizer convergence, and cross-validation diagnostics.',
        subSkills: [
          { name: 'Supervised Loss & Convex Optimization', current: 74, required: 90, proof: 'SGD and custom loss functions passed unit suites' },
          { name: 'Ensemble Trees & Gradient Boosting', current: 66, required: 88, proof: 'Kaggle churn tabular dataset top 15% ranking' },
          { name: 'Bias-Variance & Metric Validation', current: 46, required: 85, proof: 'Needs stratified k-fold evaluation harness' },
        ],
      },
      {
        id: 'deep-learning',
        name: 'Deep Learning & PyTorch',
        category: 'Neural Architectures',
        current: 48,
        required: 85,
        cohortMedian: 42,
        simulatedScore: 82,
        gap: 37,
        status: 'critical',
        priority: 'High',
        verifiedProofs: ['1 Autograd Engine Built', 'PyTorch Module Active'],
        recommendation: 'Primary gating milestone. Complete Sprint 04 LoRA fine-tuning project to surge readiness by +34%.',
        subSkills: [
          { name: 'Tensor Autograd & Backprop Flow', current: 72, required: 90, proof: 'Custom computational graph engine completed' },
          { name: 'Transformer Attention & Multi-Head', current: 44, required: 88, proof: 'Self-attention forward pass implemented' },
          { name: 'Distributed Data Parallel (DDP)', current: 28, required: 75, proof: 'Multi-GPU checkpointing simulation pending' },
        ],
      },
      {
        id: 'dsa',
        name: 'Data Structures & Algorithms',
        category: 'Computer Science',
        current: 43,
        required: 80,
        cohortMedian: 58,
        gap: 37,
        status: 'critical',
        priority: 'High',
        verifiedProofs: ['48 LeetCode Mediums', 'NeetCode Roadmap 32%'],
        recommendation: 'Solve 2 DP / Graph problems weekly to hit top-tier technical screening bar.',
        subSkills: [
          { name: 'Graph Traversal & Shortest Path', current: 52, required: 80, proof: 'Dijkstra and topological sort verified' },
          { name: 'Dynamic Programming & Memoization', current: 34, required: 80, proof: 'Struggling with multi-dimensional DP transitions' },
          { name: 'Time & Space Complexity Proofs', current: 43, required: 80, proof: 'Big-O asymptotic bounds quiz scored 82%' },
        ],
      },
      {
        id: 'mlops',
        name: 'Cloud Infrastructure & MLOps',
        category: 'Engineering & Systems',
        current: 21,
        required: 75,
        cohortMedian: 31,
        gap: 54,
        status: 'critical',
        priority: 'Medium',
        verifiedProofs: ['Docker Containerization Badge', '1 AWS S3 Pipeline'],
        recommendation: 'Containerize local model inference via FastAPI and publish Docker images with automated CI/CD.',
        subSkills: [
          { name: 'Multi-Stage Docker & Packaging', current: 42, required: 80, proof: 'FastAPI microservice containerized' },
          { name: 'Model Registry & Tracking (MLflow)', current: 14, required: 75, proof: 'Metric logging and artifact storage missing' },
          { name: 'Kubernetes & CI/CD Deployment', current: 7, required: 70, proof: 'No declarative Helm / K8s manifests verified' },
        ],
      },
      {
        id: 'python-systems',
        name: 'Python Systems & Vectorization',
        category: 'High-Performance Code',
        current: 88,
        required: 90,
        cohortMedian: 66,
        gap: 2,
        status: 'optimal',
        priority: 'Low',
        verifiedProofs: ['NumPy SIMD Acceleration Repo', 'Memory Locality Benchmark'],
        recommendation: 'Exceptional mastery. Exceeds standard entry-level hiring benchmark across Tier-1 tech.',
        subSkills: [
          { name: 'Vectorization & Broadcasting Primitives', current: 94, required: 90, proof: 'Zero-loop SIMD matrix computation validated' },
          { name: 'Memory Contiguity & Strides', current: 86, required: 90, proof: 'C-order vs Fortran buffer layout profiling passed' },
          { name: 'Multiprocessing & Concurrency', current: 84, required: 88, proof: 'Subprocess worker pool benchmark completed' },
        ],
      },
    ],
  },
  'gen-ai': {
    id: 'gen-ai',
    title: 'Generative AI & LLM Systems',
    tagline: 'RAG Architectures, Fine-Tuning & High-Throughput Serving',
    demandTrend: '+52% YoY Hiring Volume',
    postingsCount: 2420,
    alignmentScore: 59,
    simulatedAlignmentScore: 74,
    projectedTimeline: '5.2 Months',
    simulatedTimeline: '3.8 Months',
    percentile: 81,
    velocityHrsWeek: 14.0,
    interviewProbability: 71,
    simulatedInterviewProbability: 86,
    salaryIntern: '$58 – $72 / hr',
    salaryGrad: '$145k – $190k Base',
    topSkillsDemand: [
      { name: 'RAG & Hybrid Vector Retrieval', percentage: 94 },
      { name: 'LoRA / QLoRA Parameter Tuning', percentage: 86 },
      { name: 'vLLM / TensorRT Inference', percentage: 82 },
      { name: 'Agent Workflows & Guardrails', percentage: 76 },
    ],
    simulationDescription: 'Sprint 05: Enterprise RAG with Hybrid BM25+Dense Search & LoRA Fine-Tuning (+36 hrs). Closes RAG gap from 28% to 4%.',
    simulatedSkillId: 'rag-architecture',
    radarAxes: [
      { axis: 'RAG Architecture', current: 64, required: 92, cohort: 48, simulated: 88 },
      { axis: 'LoRA & PEFT Tuning', current: 38, required: 85, cohort: 32, simulated: 68 },
      { axis: 'Vector Databases', current: 72, required: 88, cohort: 50, simulated: 72 },
      { axis: 'Inference (vLLM)', current: 30, required: 80, cohort: 25, simulated: 30 },
      { axis: 'Python Async APIs', current: 86, required: 90, cohort: 62, simulated: 86 },
      { axis: 'LLM Evaluation', current: 45, required: 82, cohort: 36, simulated: 60 },
    ],
    skills: [
      {
        id: 'rag-architecture',
        name: 'RAG Architecture & Chunking Strategies',
        category: 'Retrieval Systems',
        current: 64,
        required: 92,
        cohortMedian: 48,
        simulatedScore: 88,
        gap: 28,
        status: 'moderate',
        priority: 'High',
        verifiedProofs: ['ChromaDB Document Indexer', 'Recursive Character Splitter'],
        recommendation: 'Implement reciprocal rank fusion (RRF) and re-ranking using cross-encoders to hit production recall.',
        subSkills: [
          { name: 'Hierarchical Document Chunking', current: 75, required: 90, proof: 'Semantic chunking benchmark validated' },
          { name: 'Re-ranking & Cross-Encoders', current: 52, required: 92, proof: 'Need Cohere / BGE re-ranker integration' },
          { name: 'Hybrid Dense + BM25 Sparse Search', current: 65, required: 94, proof: 'Pinecone sparse-dense vectors tested' },
        ],
      },
      {
        id: 'peft-lora',
        name: 'Parameter-Efficient Fine-Tuning (PEFT/LoRA)',
        category: 'Model Adaptation',
        current: 38,
        required: 85,
        cohortMedian: 32,
        gap: 47,
        status: 'critical',
        priority: 'High',
        verifiedProofs: ['HuggingFace Hub Account', 'Basic 7B Quantization Script'],
        recommendation: 'Fine-tune a Llama 3 8B model with LoRA on instruction pairs with loss evaluation tracking.',
        subSkills: [
          { name: 'Low-Rank Adaptation Decomposition', current: 48, required: 88, proof: 'Rank matrix gradient propagation checked' },
          { name: '4-bit / 8-bit QLoRA Quantization', current: 32, required: 85, proof: 'bitsandbytes NF4 memory footprint logged' },
          { name: 'Dataset Curation & Token Formatting', current: 34, required: 82, proof: 'Need ChatML system prompt formatting validation' },
        ],
      },
      {
        id: 'vector-dbs',
        name: 'Vector Databases & Similarity Search',
        category: 'Storage & Search',
        current: 72,
        required: 88,
        cohortMedian: 50,
        gap: 16,
        status: 'moderate',
        priority: 'Medium',
        verifiedProofs: ['Milvus & Qdrant cluster setups', 'Cosine similarity search tests'],
        recommendation: 'Configure HNSW index parameters (M and efConstruction) for sub-10ms recall at scale.',
        subSkills: [
          { name: 'HNSW & IVFFlat Index Graphs', current: 78, required: 90, proof: 'Recall vs latency tradeoff curve computed' },
          { name: 'Metadata Filtering & Namespacing', current: 70, required: 85, proof: 'Boolean compound filter queries benchmarked' },
          { name: 'Embedding Model Ingestion', current: 68, required: 88, proof: 'OpenAI and voyage-ai batch embeddings tested' },
        ],
      },
      {
        id: 'vllm-serving',
        name: 'Low-Latency LLM Serving (vLLM / TensorRT)',
        category: 'High-Throughput Systems',
        current: 30,
        required: 80,
        cohortMedian: 25,
        gap: 50,
        status: 'critical',
        priority: 'High',
        verifiedProofs: ['Local Ollama server deployment'],
        recommendation: 'Learn PagedAttention memory management and continuous batching in vLLM.',
        subSkills: [
          { name: 'PagedAttention Virtual Memory Flow', current: 35, required: 85, proof: 'KV-cache fragmentation analysis study' },
          { name: 'Continuous Batching & Speculative Decoding', current: 25, required: 80, proof: 'Draft model speculation experiment pending' },
          { name: 'Tokens/Sec Throughput Benchmarking', current: 30, required: 75, proof: 'Locust load-testing harness not connected' },
        ],
      },
      {
        id: 'eval-guardrails',
        name: 'Evaluation Harnesses & Guardrails',
        category: 'Safety & Quality',
        current: 45,
        required: 82,
        cohortMedian: 36,
        gap: 37,
        status: 'critical',
        priority: 'Medium',
        verifiedProofs: ['Prompt jailbreak testing suite'],
        recommendation: 'Adopt RAGAS or TruLens for automated faithfulness and hallucination metrics.',
        subSkills: [
          { name: 'RAGAS Faithfulness & Answer Relevance', current: 50, required: 85, proof: 'Ground-truth Q&A eval dataset created' },
          { name: 'NeMo Guardrails & Prompt Injection Defense', current: 42, required: 80, proof: 'Input validation regex and model safety filters' },
          { name: 'Cost & Token Telemetry Profiling', current: 43, required: 80, proof: 'OpenTelemetry token usage traces enabled' },
        ],
      },
    ],
  },
  'data-science': {
    id: 'data-science',
    title: 'Data Science & Quantitative Analytics',
    tagline: 'Statistical Inference, Causal Modeling & Scaled Data Engines',
    demandTrend: '+22% YoY Hiring Volume',
    postingsCount: 1410,
    alignmentScore: 76,
    simulatedAlignmentScore: 86,
    projectedTimeline: '3.0 Months',
    simulatedTimeline: '2.1 Months',
    percentile: 92,
    velocityHrsWeek: 11.0,
    interviewProbability: 84,
    simulatedInterviewProbability: 93,
    salaryIntern: '$48 – $58 / hr',
    salaryGrad: '$125k – $155k Base',
    topSkillsDemand: [
      { name: 'Advanced SQL & Data Warehousing', percentage: 95 },
      { name: 'Statistical Testing & A/B Experiments', percentage: 89 },
      { name: 'Predictive Modeling & Scikit-Learn', percentage: 86 },
      { name: 'Causal Inference & Econometrics', percentage: 72 },
    ],
    simulationDescription: 'Sprint 03: Advanced A/B Testing & Bayesian Causal Inference (+26 hrs). Closes Experimentation gap from 30% to 2%.',
    simulatedSkillId: 'ab-experimentation',
    radarAxes: [
      { axis: 'Statistical Inference', current: 82, required: 92, cohort: 60, simulated: 82 },
      { axis: 'Advanced SQL', current: 78, required: 90, cohort: 65, simulated: 78 },
      { axis: 'EDA & Polars', current: 90, required: 92, cohort: 70, simulated: 90 },
      { axis: 'Predictive Modeling', current: 70, required: 85, cohort: 55, simulated: 70 },
      { axis: 'A/B Experimentation', current: 52, required: 82, cohort: 40, simulated: 80 },
      { axis: 'Business Telemetry', current: 74, required: 80, cohort: 58, simulated: 74 },
    ],
    skills: [
      {
        id: 'statistical-inference',
        name: 'Statistical Inference & Hypothesis Testing',
        category: 'Mathematics & Stats',
        current: 82,
        required: 92,
        cohortMedian: 60,
        gap: 10,
        status: 'optimal',
        priority: 'Low',
        verifiedProofs: ['Stanford CS109 Honor Project', 'Bayesian MCMC Repo'],
        recommendation: 'Solid mathematical core. Ready for quantitative analytics screening.',
        subSkills: [
          { name: 'Null Hypothesis Significance Testing (NHST)', current: 88, required: 92, proof: 'P-value adjustments & power analysis validated' },
          { name: 'Bayesian Priors & Posterior Updating', current: 80, required: 90, proof: 'PyMC beta-binomial modeling repo active' },
          { name: 'Bootstrapping & Non-Parametric Tests', current: 78, required: 94, proof: 'Resampling confidence interval benchmarks passed' },
        ],
      },
      {
        id: 'advanced-sql',
        name: 'Advanced SQL & Distributed Pipelines',
        category: 'Data Engineering',
        current: 78,
        required: 90,
        cohortMedian: 65,
        gap: 12,
        status: 'moderate',
        priority: 'Medium',
        verifiedProofs: ['LeetCode SQL 50 100% Passed', 'BigQuery Window Query Audit'],
        recommendation: 'Practice complex recursive CTEs and distributed partition optimization.',
        subSkills: [
          { name: 'Window Functions & Self-Joins', current: 88, required: 92, proof: 'Lead/Lag cohort retention tables verified' },
          { name: 'Query Optimization & Partitioning', current: 72, required: 88, proof: 'Explain plan cost minimization exercise passed' },
          { name: 'dbt Transformation Data Models', current: 74, required: 90, proof: 'Staging to mart DAG built in dbt-core' },
        ],
      },
      {
        id: 'eda-polars',
        name: 'Exploratory Data Analysis & Polars',
        category: 'Data Manipulation',
        current: 90,
        required: 92,
        cohortMedian: 70,
        gap: 2,
        status: 'optimal',
        priority: 'Low',
        verifiedProofs: ['Polars Rust-speed dataframe repo', 'Data profiling suite'],
        recommendation: 'Exceptional data wrangling efficiency.',
        subSkills: [
          { name: 'Polars LazyFrames & Expression API', current: 94, required: 92, proof: 'Lazy execution graph optimization passed' },
          { name: 'Missing Data & Anomaly Imputation', current: 88, required: 90, proof: 'KNN & iterative MICE imputations verified' },
          { name: 'Multivariate Correlation & Collinearity', current: 88, required: 94, proof: 'VIF variance inflation factor tests passed' },
        ],
      },
      {
        id: 'ab-experimentation',
        name: 'A/B Testing & Causal Inference',
        category: 'Product Analytics',
        current: 52,
        required: 82,
        cohortMedian: 40,
        simulatedScore: 80,
        gap: 30,
        status: 'critical',
        priority: 'High',
        verifiedProofs: ['Sample size calculator utility'],
        recommendation: 'Primary blocker for senior product data scientist internships. Sprint 03 focuses on Cuped & variance reduction.',
        subSkills: [
          { name: 'Minimum Detectable Effect (MDE) & Power', current: 62, required: 85, proof: 'Two-sided sample size estimation verified' },
          { name: 'CUPED Variance Reduction', current: 38, required: 80, proof: 'Covariate regression adjustments pending' },
          { name: 'Difference-in-Differences & Quasi-Experiments', current: 42, required: 82, proof: 'Parallel trends assumption checks needed' },
        ],
      },
    ],
  },
};

export const ROADMAP_MILESTONES: RoadmapMilestone[] = [
  {
    id: 'step-1',
    step: 1,
    title: 'Python for High-Performance AI',
    subtitle: 'NumPy, Vectorization, Matrix Algebra',
    status: 'completed',
    duration: '3 Weeks',
    tags: ['Python', 'NumPy', 'Vector Math'],
    deliverable: 'Custom Tensor Autograd Engine from scratch',
    description: 'Mastered memory layout, vectorized computing, and broadcasting primitives.',
    aiRecommendation: 'Completed with 96% accuracy on benchmark tests.',
  },
  {
    id: 'step-2',
    step: 2,
    title: 'Statistical Learning & Probability',
    subtitle: 'Hypothesis Testing, Bayes, Maximum Likelihood',
    status: 'completed',
    duration: '2 Weeks',
    tags: ['Statistics', 'Bayesian', 'Probability'],
    deliverable: 'Probabilistic spam detection & anomaly filter',
    description: 'Firm foundation in regression models, variance trade-offs, and distributions.',
    aiRecommendation: 'Demonstrated exceptional intuition in cost function optimization.',
  },
  {
    id: 'step-3',
    step: 3,
    title: 'Machine Learning Algorithms',
    subtitle: 'Supervised, Unsupervised & Ensemble Methods',
    status: 'active',
    duration: 'Current Module • 4 Weeks',
    tags: ['Scikit-Learn', 'Gradient Boosting', 'Optimization'],
    deliverable: 'End-to-end customer churn prediction pipeline',
    description: 'Active learning sprint focusing on XGBoost, SVMs, and feature engineering.',
    aiRecommendation: 'Currently 72% complete. 2 coding challenges remaining.',
  },
  {
    id: 'step-4',
    step: 4,
    title: 'Deep Learning Architectures',
    subtitle: 'Transformers, Attention Mechanisms & PyTorch',
    status: 'upcoming',
    duration: 'Next Milestone • 5 Weeks',
    tags: ['PyTorch', 'Transformers', 'Vision & NLP'],
    deliverable: 'Fine-tuned small language model with LoRA',
    description: 'Deep dive into multi-head attention, backprop debugging, and tensor parallelism.',
    aiRecommendation: 'Pre-requisites fulfilled. Ready to unlock upon completing ML algorithms.',
  },
  {
    id: 'step-5',
    step: 5,
    title: 'Generative AI & LLM Systems',
    subtitle: 'RAG Architectures, Vector DBs & Quantization',
    status: 'upcoming',
    duration: 'Upcoming • 3 Weeks',
    tags: ['LangChain', 'ChromaDB', 'vLLM'],
    deliverable: 'Autonomous Multi-agent research assistant',
    description: 'Productionizing generative AI pipelines with low-latency inference.',
    aiRecommendation: 'High recruiter priority for Summer 2026 internships.',
  },
  {
    id: 'step-6',
    step: 6,
    title: 'AI/ML Engineering Internship Placement',
    subtitle: 'Verified Match with Top AI Labs & Tech Leaders',
    status: 'upcoming',
    duration: 'Target Goal • Summer 2026',
    tags: ['Placement', 'Interviews', 'TechNova / ByteCraft'],
    deliverable: 'Offer acceptance & career bridge transition',
    description: 'Direct pipeline connection to hiring managers looking for verified skills.',
    aiRecommendation: 'Placement probability projected at 94% upon roadmap completion.',
  },
];

export const OPPORTUNITY_ITEMS: OpportunityItem[] = [
  {
    id: 'opp-1',
    role: 'Machine Learning Intern',
    company: 'TechNova Labs',
    location: 'San Francisco, CA (Remote)',
    type: 'Internship • 12 Weeks',
    matchScore: 92,
    category: 'AI / Deep Learning',
    logoColor: 'linear-gradient(135deg, #8B5CF6, #38BDF8)',
    matchedSkills: ['Python', 'Machine Learning', 'PyTorch', 'SQL', 'End-to-End Pipeline Project'],
    recommendedToLearn: ['Docker containerization', 'MLflow registry'],
    whyMatch: 'Matches 92% of TechNova\'s core requirements for perception modeling. Verified project repo passes code quality threshold.',
    salaryRange: '$52 – $65 / hr',
  },
  {
    id: 'opp-2',
    role: 'Data Science & AI Intern',
    company: 'ByteCraft Intelligence',
    location: 'New York, NY (Hybrid)',
    type: 'Internship • Summer 2026',
    matchScore: 87,
    category: 'Data Science',
    logoColor: 'linear-gradient(135deg, #38BDF8, #34D399)',
    matchedSkills: ['Python', 'Statistical Modeling', 'Scikit-Learn', 'Feature Engineering'],
    recommendedToLearn: ['Apache Spark', 'Tableau / Looker'],
    whyMatch: 'Strong mathematical background and probability foundation aligns with ByteCraft\'s algorithmic trading analytics.',
    salaryRange: '$48 – $58 / hr',
  },
  {
    id: 'opp-3',
    role: 'Junior Software Engineer (AI Systems)',
    company: 'CloudNext Infrastructure',
    location: 'Austin, TX (Remote)',
    type: 'Full-time / New Grad',
    matchScore: 81,
    category: 'Infrastructure',
    logoColor: 'linear-gradient(135deg, #F472B6, #818CF8)',
    matchedSkills: ['Python', 'FastAPI', 'DSA Fundamentals', 'Git Collaboration'],
    recommendedToLearn: ['Kubernetes', 'gRPC Services'],
    whyMatch: 'Solid engineering core; recommended for backend AI infrastructure track once cloud deployment module is completed.',
    salaryRange: '$115k – $135k / yr',
  },
];


export const RECRUITER_STATS = [
  { label: 'Verified College Talent', value: '45,000+' },
  { label: 'Avg. Time to First Interview', value: '7.2 Days' },
  { label: 'Skill Gap Prediction Accuracy', value: '98.4%' },
  { label: 'Partner Tech Companies', value: '380+' },
];
