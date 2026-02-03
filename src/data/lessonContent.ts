// Comprehensive Journey Maps content for Parkinson's Disease
// Based on the Disease Maps document with all stages, substages, and nodes

export type NodeType = "entry" | "choice" | "info" | "subsection";

export interface LessonNode {
  id: string;
  title: string;
  stage: string;
  substage?: string;
  nodeType: NodeType;
  status: "done" | "current" | "available";
  description: string;
  videoTitle?: string;
  aboutStation?: string;
  actionToTake?: string;
  moreDetails?: string;
  neuroQueryPrompts?: string[];
  questionsForTeam?: string[];
  considerations?: string;
  additionalResources?: string[];
  // For user tracking
  userIsHere?: boolean;
}

// All stages in the journey map
export const stages = ["Diagnosis", "Treatment", "Living"];

// Substages for each main stage
export const substages: Record<string, string[]> = {
  "Diagnosis": [
    "Recognize Symptoms",
    "Medical Evaluation", 
    "Specialist Evaluation"
  ],
  "Treatment": [
    "First-Line Treatment",
    "Medication Adjustments",
    "Non-Pharmacological",
    "Advanced Therapies"
  ],
  "Living": [
    "Early Stage (I-II)",
    "Mid Stage (III)",
    "Advanced Stage (IV-V)",
    "Daily Living"
  ]
};

// All lessons/nodes in the journey map
export const allLessons: LessonNode[] = [
  // ============================================
  // DIAGNOSIS STAGE
  // ============================================
  
  // Substage: Recognize Symptoms
  {
    id: "diag-1",
    title: "Recognize Possible Symptoms",
    stage: "Diagnosis",
    substage: "Recognize Symptoms",
    nodeType: "entry",
    status: "available",
    description: "Identifying early motor and non-motor signs that may suggest Parkinson's disease (PD).",
    videoTitle: "What is Parkinson's Disease? (Michael J. Fox Foundation)",
    aboutStation: "Parkinson's disease often starts slowly. Key motor signs include resting tremor, muscular rigidity, bradykinesia (slowness of movement) and postural instability—sometimes summarised as TRAP. Non-motor symptoms such as loss of smell, constipation, depression or REM-sleep behaviour disorder may also precede motor symptoms.",
    actionToTake: "Keep a symptom diary noting tremors, stiffness, changes in handwriting, slowness or non-motor problems. Discuss concerns with a trusted family member. If symptoms persist or interfere with daily activities, proceed to the Seek Medical Evaluation node.",
    moreDetails: "Motor vs Non-motor: Motor symptoms suggest the classic movement disorder. Non-motor features (sleep disturbances, constipation, depression) may precede motor symptoms by years. If symptoms are mild and do not impact daily tasks, you might monitor them for a short period. If they interfere with work, self-care or driving, seek medical evaluation promptly.",
    neuroQueryPrompts: [
      "Are my tremors only when I'm stressed or also at rest?",
      "Do I have trouble writing or buttoning shirts compared with a year ago?",
      "Am I experiencing other changes (constipation, depression, loss of smell) that might be related?",
    ],
    questionsForTeam: [
      "What symptoms are typical of early PD?",
      "Could my medicines be causing these symptoms?",
      "What lifestyle changes might help while we wait for evaluation?",
    ],
    considerations: "Family history (rare hereditary forms exist) and age of onset. Note whether symptoms started on one side of the body and gradually spread.",
    additionalResources: [
      "National Institute of Neurological Disorders and Stroke (NINDS) PD overview",
      "Family Caregiver Alliance article on prodromal and stage I PD",
    ],
  },
  {
    id: "diag-2",
    title: "Non-Motor & Prodromal Symptoms",
    stage: "Diagnosis",
    substage: "Recognize Symptoms",
    nodeType: "info",
    status: "available",
    description: "Understanding early non-motor signs that often precede motor symptoms.",
    videoTitle: "Non-motor Symptoms of Parkinson's Disease",
    aboutStation: "Non-motor symptoms such as anosmia (loss of smell), constipation, fatigue, anxiety, depression, and REM sleep behaviour disorder may appear years before motor symptoms. Recognising them can prompt earlier evaluation.",
    actionToTake: "If you or your loved one have unexplained constipation, mood changes or acting out dreams, discuss these symptoms with your doctor. Keep a list to bring to the evaluation.",
    moreDetails: "Non-motor features can be subtle. Not everyone with these symptoms will develop PD, but they are important to mention to your physician. They may also prompt screening for other conditions like depression or sleep apnoea.",
    neuroQueryPrompts: [
      "Have I noticed a reduced sense of smell over the past few years?",
      "Do I act out my dreams or flail at night?",
      "Are there sudden drops in blood pressure causing dizziness?",
    ],
    questionsForTeam: [
      "Could these non-motor symptoms be related to Parkinson's or another condition?",
      "Are there treatments to improve sleep and bowel function?",
      "Should I see a sleep specialist or gastroenterologist?",
    ],
    considerations: "Consider other causes (medications, thyroid problems, diabetes). Document when symptoms started and whether they fluctuate.",
    additionalResources: [
      "Parkinson's Foundation information on non-motor symptoms",
    ],
  },
  {
    id: "diag-3",
    title: "Symptoms Interfering with Daily Life?",
    stage: "Diagnosis",
    substage: "Recognize Symptoms",
    nodeType: "choice",
    status: "available",
    description: "Determine whether symptoms are mild or are affecting quality of life.",
    aboutStation: "Assess if tremor, stiffness or other symptoms limit work, hobbies or personal care. The NICE guideline advises referring untreated individuals promptly to a specialist if PD is suspected.",
    actionToTake: "Yes (symptoms interfere): Move to Seek Medical Evaluation. No (minimal interference): Continue monitoring symptoms. Adopt lifestyle measures (exercise, healthy diet) and revisit evaluation if symptoms progress.",
    neuroQueryPrompts: [
      "Have I stopped activities I enjoy because of symptoms?",
      "Do family members notice changes even if I feel fine?",
    ],
    questionsForTeam: [
      "When should mild symptoms be investigated?",
      "Are there screening tests I can do at home?",
    ],
    considerations: "Age, occupation (e.g., job safety if tremors exist), co-existing conditions.",
    additionalResources: [
      "Parkinson's Well-Being Map (Stanford) for self-tracking symptoms",
    ],
  },

  // Substage: Medical Evaluation
  {
    id: "diag-4",
    title: "Seek Medical Evaluation",
    stage: "Diagnosis",
    substage: "Medical Evaluation",
    nodeType: "entry",
    status: "available",
    description: "Contact a health professional (typically a GP or family doctor) to discuss symptoms and obtain referrals.",
    videoTitle: "Diagnosis of Parkinson's Disease (Froedtert & MCW Health Network)",
    aboutStation: "In most health systems, you start with a primary care provider. NICE guidelines emphasise referring individuals with suspected PD to a specialist without starting symptomatic treatment. Your GP will review medical history, medication list and perform a neurological exam.",
    actionToTake: "Prepare a list of all medications and supplements (some can cause drug-induced parkinsonism). Bring your symptom diary. Ask for referral to a neurologist or movement disorder specialist.",
    moreDetails: "Medication review: Certain antipsychotics and anti-nausea drugs can cause parkinsonism. Red flags for urgent referral: Rapid progression, early falls, severe autonomic dysfunction, lack of response to levodopa.",
    neuroQueryPrompts: [
      "Are my current medications contributing to my symptoms?",
      "What tests can rule out other conditions?",
    ],
    questionsForTeam: [
      "What should I expect from a neurologist visit?",
      "Do I need any imaging before seeing the specialist?",
      "How long is the wait time for a specialist appointment?",
    ],
    considerations: "Insurance coverage, location of movement disorder clinics, ability to travel.",
    additionalResources: [
      "Specialist Link or local health service Parkinson's primary care pathway",
      "Parkinson's Foundation helpline for referrals",
    ],
  },
  {
    id: "diag-5",
    title: "Drug-Induced or Other Condition?",
    stage: "Diagnosis",
    substage: "Medical Evaluation",
    nodeType: "choice",
    status: "available",
    description: "Decide whether medications or alternate diagnoses explain the symptoms.",
    aboutStation: "Drug-induced parkinsonism often mimics PD and may improve after discontinuing the offending medication (antipsychotics, calcium channel blockers, metoclopramide). Also consider essential tremor, normal-pressure hydrocephalus, MSA or PSP.",
    actionToTake: "Yes (drug induced or other condition): Work with your doctor to adjust medications. If symptoms improve within weeks, PD is less likely. No (not drug induced): Proceed to Neurologist Evaluation.",
    moreDetails: "Red flags for atypical parkinsonism include poor response to levodopa, early falls, early cognitive decline or prominent autonomic dysfunction. Normal-pressure hydrocephalus features gait disturbance, urinary incontinence and cognitive impairment.",
    neuroQueryPrompts: [
      "Have my symptoms started after beginning a new medication?",
      "Are there warning signs that suggest conditions like PSP or MSA?",
    ],
    questionsForTeam: [
      "Which drugs could cause my symptoms?",
      "How long should we wait to see improvement after stopping a drug?",
      "What tests differentiate Parkinson's from essential tremor?",
    ],
    considerations: "Abruptly stopping medications may be unsafe; always seek professional advice before adjusting medication.",
    additionalResources: [
      "Parkinson's UK factsheets on atypical parkinsonism",
      "Comparison charts of PD vs essential tremor",
    ],
  },

  // Substage: Specialist Evaluation
  {
    id: "diag-6",
    title: "Neurologist / Movement Disorder Specialist",
    stage: "Diagnosis",
    substage: "Specialist Evaluation",
    nodeType: "entry",
    status: "available",
    description: "Comprehensive neurological examination and confirmation of Parkinson's disease.",
    videoTitle: "Stanford Medicine 25: Parkinson's Disease Physical Exam",
    aboutStation: "Diagnosis of PD is clinical; there is no single definitive test. The neurologist will take a detailed history, perform a neurological exam, and may order tests to exclude other disorders. The specialist assesses resting tremor, rigidity, bradykinesia, gait and postural stability.",
    actionToTake: "Answer questions about symptom onset, progression and family history. Bring a family member for second-hand observations. Ask about the diagnosis and prognosis.",
    moreDetails: "If clinical criteria are met (e.g., UK Parkinson's Disease Society Brain Bank criteria), proceed to PD Diagnosis Confirmed. If features are atypical, the neurologist may recommend follow-up to observe progression.",
    neuroQueryPrompts: [
      "What criteria are used to diagnose PD?",
      "Do I need a DaTSCAN or other imaging?",
      "Should genetic testing be considered?",
    ],
    questionsForTeam: [
      "How certain are you of the diagnosis?",
      "What symptoms should prompt immediate contact?",
      "When should I schedule follow-up visits?",
    ],
    considerations: "Confirming PD early allows timely initiation of therapy and lifestyle modifications. Some patients choose to seek a second opinion at a movement disorder centre.",
    additionalResources: [
      "NINDS description of PD diagnosis and tests",
      "NICE guideline on confirming PD and annual review by specialists",
    ],
  },
  {
    id: "diag-7",
    title: "PD Diagnosis Confirmed?",
    stage: "Diagnosis",
    substage: "Specialist Evaluation",
    nodeType: "choice",
    status: "available",
    description: "Determine whether the neurologist has made a clear PD diagnosis.",
    aboutStation: "After evaluation, the neurologist may diagnose idiopathic PD, another form of parkinsonism, or remain uncertain.",
    actionToTake: "Yes (PD confirmed): Proceed to Treatment category. No (other parkinsonism): Follow guidance for atypical or secondary parkinsonism or return to Monitor/Follow-up.",
    moreDetails: "Confirmation typically requires bradykinesia plus at least one of rest tremor or rigidity, with supportive criteria and no exclusion criteria. Genetic testing or α-synuclein seed amplification assay (SAA) may be offered in research settings but are not routine.",
    neuroQueryPrompts: [
      "What does idiopathic mean?",
      "Should I seek a second opinion?",
    ],
    questionsForTeam: [
      "Do I need to repeat the evaluation in six months or a year?",
      "Are there lifestyle changes I should adopt while we watch and wait?",
    ],
    considerations: "Accepting or seeking a second opinion, considering participation in research studies.",
    additionalResources: [
      "Parkinson's Foundation information on PD diagnosis",
    ],
  },

  // ============================================
  // TREATMENT STAGE
  // ============================================

  // Substage: First-Line Treatment
  {
    id: "treat-1",
    title: "First-Line Medical Treatment",
    stage: "Treatment",
    substage: "First-Line Treatment",
    nodeType: "entry",
    status: "available",
    description: "Initiate medication to control motor symptoms and improve quality of life.",
    videoTitle: "Medication Treatments for Parkinson's Disease (Parkinson's Foundation)",
    aboutStation: "Once PD is diagnosed and symptoms impact quality of life, pharmacological therapy is recommended. NICE guidelines advise offering levodopa combined with a dopa-decarboxylase inhibitor as first-line therapy. For milder symptoms, a dopamine agonist or MAO-B inhibitor may be considered.",
    actionToTake: "Discuss medication options, benefits and side effects with your specialist. Start with the lowest effective dose and monitor response. Keep a log of symptom improvements and adverse effects.",
    moreDetails: "Levodopa provides superior motor benefit but may lead to dyskinesia after years of use. Dopamine agonists have less risk of dyskinesia but more impulse control and sleepiness side effects. MAO-B inhibitors provide modest benefit but are well tolerated.",
    neuroQueryPrompts: [
      "What are the common side effects of levodopa?",
      "How do dopamine agonists differ from levodopa?",
      "What lifestyle changes complement medication?",
    ],
    questionsForTeam: [
      "Which medication is most appropriate for my age and symptom profile?",
      "How long will it take to see benefit?",
      "What should I do if I miss a dose?",
    ],
    considerations: "Age, cognitive status, occupation (some medications cause sleep attacks), risk of dyskinesia, personal preferences.",
    additionalResources: [
      "NINDS description of PD treatments",
      "NICE guideline recommendations on first-line therapy",
    ],
  },

  // Substage: Medication Adjustments
  {
    id: "treat-2",
    title: "Managing Wearing-Off & 'Off' Time",
    stage: "Treatment",
    substage: "Medication Adjustments",
    nodeType: "info",
    status: "available",
    description: "Recognising and managing the return of symptoms before the next dose of medication.",
    videoTitle: "Understanding Motor Fluctuations in Parkinson's",
    aboutStation: "As PD advances, the effect of each levodopa dose can wane, leading to 'off' time when tremor, rigidity or slowness return. These wearing-off episodes reduce quality of life and often occur just before the next scheduled dose.",
    actionToTake: "Keep a diary noting when medication is taken and when symptoms return. Talk to your neurologist about adjusting dosing frequency or using controlled-release formulations. Consider adjunct medications (COMT inhibitors, MAO-B inhibitors) to smooth out fluctuations.",
    moreDetails: "Are wearing-off episodes present? Yes – increasing dose frequency or adding a COMT or MAO-B inhibitor may help. Do 'off' periods occur at predictable times? If yes, adjust dosing schedule; if unpredictable, discuss continuous infusion therapies.",
    neuroQueryPrompts: [
      "How do I track my 'on' and 'off' times effectively?",
      "Are there specific triggers that worsen my off periods?",
      "What adjunct medications could help in my case?",
    ],
    questionsForTeam: [
      "How should my medication schedule change to reduce off time?",
      "Are there new extended-release formulations I should try?",
      "Should I consider a medication pump or infusion?",
    ],
  },
  {
    id: "treat-3",
    title: "Dealing with Dyskinesia",
    stage: "Treatment",
    substage: "Medication Adjustments",
    nodeType: "info",
    status: "available",
    description: "Understanding and managing involuntary movements caused by long-term levodopa therapy.",
    videoTitle: "Dyskinesia and Parkinson's",
    aboutStation: "Dyskinesia refers to uncontrolled, involuntary movements that can occur after years of levodopa therapy. Not everyone develops dyskinesia, but risk factors include younger age at diagnosis and higher total levodopa dose. Dyskinesia tends to occur when other PD symptoms are well controlled.",
    actionToTake: "Record when dyskinesias occur relative to medication doses. Discuss reducing individual doses while increasing frequency or switching to extended-release formulations. Medications such as amantadine can lessen dyskinesias; in advanced cases, deep brain stimulation may be considered.",
    moreDetails: "Is dyskinesia bothersome? Yes – adjust dosing or add amantadine. Does dyskinesia limit daily activities? If yes, discuss advanced therapies like DBS with your specialist.",
    neuroQueryPrompts: [
      "What are the risks and benefits of amantadine for dyskinesia?",
      "When is deep brain stimulation considered for dyskinesia?",
      "How do I distinguish dyskinesia from tremor?",
    ],
    questionsForTeam: [
      "Which strategies can help balance motor control and involuntary movements?",
      "What side effects should I watch for with amantadine?",
      "Could adjusting the timing of my doses reduce dyskinesia?",
    ],
    considerations: "Severity of dyskinesia vs motor benefit, side effects of adjunct medications, eligibility for surgical therapies.",
    additionalResources: [
      "Michael J. Fox Foundation article on dyskinesia",
    ],
  },
  {
    id: "treat-4",
    title: "Adjuvant Medication Options",
    stage: "Treatment",
    substage: "Medication Adjustments",
    nodeType: "info",
    status: "available",
    description: "Overview of add-on medications such as COMT inhibitors, MAO-B inhibitors and dopamine agonists.",
    videoTitle: "Parkinson's Medications Explained",
    aboutStation: "When levodopa alone no longer provides smooth symptom control, physicians may add other medications. COMT inhibitors (entacapone, opicapone) prolong the effect of levodopa. MAO-B inhibitors (rasagiline, selegiline) reduce dopamine metabolism; dopamine agonists (pramipexole, ropinirole) stimulate dopamine receptors directly.",
    actionToTake: "Talk with your doctor about whether adding an adjunct medication is appropriate. Start with a low dose and monitor for side effects such as nausea, hallucinations, sleepiness or impulse control disorders.",
    moreDetails: "COMT inhibitors may cause diarrhoea or urine discolouration; MAO-B inhibitors interact with certain antidepressants; dopamine agonists may cause impulse control disorders. These medications can improve wearing-off but may not reduce dyskinesia.",
    neuroQueryPrompts: [
      "What are the pros and cons of adding a COMT inhibitor?",
      "How do I recognise impulse control disorders with dopamine agonists?",
      "Are MAO-B inhibitors safe with my antidepressants?",
    ],
    questionsForTeam: [
      "Which adjunct medication is best for my symptoms and lifestyle?",
      "What side effects should I monitor?",
      "How often should we reassess the regimen?",
    ],
    considerations: "Balancing efficacy and side effects, existing medications (drug interactions), cost and insurance coverage.",
    additionalResources: [
      "NINDS explanation of PD medications",
      "NICE guideline recommendations",
    ],
  },
  {
    id: "treat-5",
    title: "Diet & Medication Timing",
    stage: "Treatment",
    substage: "Medication Adjustments",
    nodeType: "info",
    status: "available",
    description: "Understanding how diet and timing affect levodopa absorption and effectiveness.",
    videoTitle: "Diet and Parkinson's Medications",
    aboutStation: "Levodopa competes with dietary proteins for absorption. Taking levodopa with high-protein meals can reduce its effectiveness. The Michael J. Fox Foundation notes that doctors often advise taking levodopa 30 minutes before or 60 minutes after meals and saving higher protein intake for later in the day.",
    actionToTake: "Schedule levodopa doses relative to meals as advised by your doctor. Spread protein intake evenly and consume the bulk of daily protein at dinner. Avoid taking levodopa with iron supplements; separate by at least two hours.",
    moreDetails: "Some people benefit from a small carbohydrate snack when taking levodopa to reduce nausea. Check labels for protein content, particularly with fortified cereals and protein shakes. Talk to a dietitian about balancing nutrition with medication timing.",
    neuroQueryPrompts: [
      "How do I plan meals around my medication schedule?",
      "What foods or supplements should I avoid near my levodopa dose?",
      "Can splitting protein intake throughout the day help?",
    ],
    questionsForTeam: [
      "Do I need to adjust my diet to improve medication absorption?",
      "Should I take vitamins or supplements at specific times?",
      "Are there interactions between my PD drugs and over-the-counter products?",
    ],
    considerations: "Dietary preferences, nutritional requirements, risk of weight loss, personal routine.",
  },

  // Substage: Non-Pharmacological
  {
    id: "treat-6",
    title: "Non-Pharmacological Management",
    stage: "Treatment",
    substage: "Non-Pharmacological",
    nodeType: "info",
    status: "available",
    description: "Therapies beyond medications to optimise function and quality of life.",
    videoTitle: "Exercise and Parkinson's (Parkinson's Foundation)",
    aboutStation: "Exercise, physiotherapy, occupational therapy, speech and language therapy, and nutritional advice are integral to PD management. NICE guidelines recommend offering these therapies to people with PD whose motor symptoms impact daily life.",
    actionToTake: "Engage in regular aerobic exercise, strength training and balance activities. See a physiotherapist for gait training and a speech therapist for voice and swallowing issues. Consult an occupational therapist for home and workplace modifications.",
    moreDetails: "Exercise may slow progression and improves mood. Tai chi, yoga and dance (e.g., tango) enhance balance and mobility. Diet rich in fibre and fluids can relieve constipation; adequate vitamin D is advised.",
    neuroQueryPrompts: [
      "How often should I exercise and what types are best for PD?",
      "Can occupational therapy help with daily tasks like dressing and cooking?",
      "Do I need a speech therapist if my speech is soft?",
    ],
    questionsForTeam: [
      "What non-pharmacological interventions are available locally?",
      "Are there PD-specific exercise programs (e.g., boxing, cycling)?",
      "How do I access therapy referrals?",
    ],
    considerations: "Insurance coverage, travel to therapy centres, adherence to exercise, risk of falls.",
    additionalResources: [
      "NICE guideline on allied health therapies",
      "APDA and Parkinson's Foundation exercise guides",
    ],
  },

  // Substage: Advanced Therapies
  {
    id: "treat-7",
    title: "Apomorphine Infusion",
    stage: "Treatment",
    substage: "Advanced Therapies",
    nodeType: "info",
    status: "available",
    description: "Continuous dopaminergic stimulation delivered via a portable subcutaneous pump.",
    videoTitle: "Apomorphine Pump Therapy",
    aboutStation: "Apomorphine is a potent dopamine agonist used in advanced PD to reduce 'off' time. A small pump infuses apomorphine under the skin throughout the day, providing steady symptom control. Patients who respond well to levodopa but experience unpredictable fluctuations may benefit.",
    actionToTake: "Consult a movement-disorder specialist to assess candidacy. Training is required to insert the infusion needle and manage the pump. Nausea is common initially, so antiemetic medications are often prescribed. Monitor injection sites for skin nodules.",
    moreDetails: "Apomorphine can be delivered as intermittent injections for sudden 'off' episodes or as continuous infusion. Side effects include sleepiness, hypotension and hallucinations. Insurance coverage varies; pumps require daily setup and care.",
    neuroQueryPrompts: [
      "What are the practical steps for living with an apomorphine pump?",
      "How does apomorphine compare to LCIG or DBS?",
      "What side effects should I monitor?",
    ],
    questionsForTeam: [
      "Am I a candidate for apomorphine infusion?",
      "How is nausea managed during initiation?",
      "Who helps with pump training and maintenance?",
    ],
    considerations: "Comfort with managing a pump, caregiver support, ability to handle skin care, cost and insurance.",
    additionalResources: [
      "NICE guideline on advanced therapies",
    ],
  },
  {
    id: "treat-8",
    title: "Levodopa-Carbidopa Intestinal Gel (LCIG)",
    stage: "Treatment",
    substage: "Advanced Therapies",
    nodeType: "info",
    status: "available",
    description: "Delivering levodopa-carbidopa gel directly to the small intestine for continuous absorption.",
    videoTitle: "Duopa Intestinal Gel Therapy",
    aboutStation: "LCIG (Duopa/Duodopa) uses a surgically placed tube (PEG-J) to deliver levodopa gel continuously into the jejunum. This bypasses stomach emptying issues and reduces off time and dyskinesia. Candidates require a good response to oral levodopa and sufficient cognitive function.",
    actionToTake: "Undergo a trial with a nasojejunal tube to assess benefit. If successful, a permanent tube is inserted via endoscopy or surgery. Learn pump management and stoma care. Regular follow-up is needed to adjust dosing and monitor complications.",
    moreDetails: "LCIG reduces off time but may cause weight loss, neuropathy or infection at the stoma site. The pump requires daily cassettes. Eating may be easier because medication bypasses the stomach. Insurance coverage and access vary.",
    neuroQueryPrompts: [
      "What is the procedure for PEG-J tube placement?",
      "How do I care for the stoma and prevent infection?",
      "What lifestyle changes come with carrying a pump?",
    ],
    questionsForTeam: [
      "Am I a good candidate for LCIG?",
      "How is the dose adjusted over time?",
      "What are the risks of tube dislodgement or infection?",
    ],
    considerations: "Willingness to undergo surgery, ability to manage the device, risk of complications, insurance coverage.",
  },
  {
    id: "treat-9",
    title: "Deep Brain Stimulation (DBS)",
    stage: "Treatment",
    substage: "Advanced Therapies",
    nodeType: "info",
    status: "available",
    description: "Surgical implantation of electrodes to modulate brain activity and improve motor symptoms.",
    videoTitle: "Deep Brain Stimulation Explained",
    aboutStation: "DBS involves placing electrodes in specific brain regions (usually the subthalamic nucleus or globus pallidus interna) and connecting them to a programmable pulse generator implanted under the skin. DBS does not cure PD but can significantly reduce motor symptoms and medication requirements in carefully selected patients.",
    actionToTake: "Undergo thorough evaluation by a multidisciplinary team. Ideal candidates are younger, have good levodopa response and no severe cognitive impairment. After surgery, stimulation settings are adjusted over several months, and medications are tapered.",
    moreDetails: "DBS is reversible and adjustable. Benefits include improved 'on' time without dyskinesia and potential reduction of medication dose. Risks include bleeding, infection, speech changes, mood alterations and cognitive effects. Regular follow-up is required to fine-tune settings.",
    neuroQueryPrompts: [
      "What are the steps of DBS surgery and recovery?",
      "How are stimulation settings adjusted?",
      "What potential side effects should I monitor?",
    ],
    questionsForTeam: [
      "Am I a candidate for DBS?",
      "What outcomes should I expect compared with medication alone?",
      "How does DBS affect my daily routines and activities?",
    ],
    considerations: "Surgical risk tolerance, cognitive status, support network to manage follow-up, insurance coverage and cost.",
    additionalResources: [
      "NINDS deep brain stimulation overview",
      "NICE guidelines on DBS",
    ],
  },
  {
    id: "treat-10",
    title: "Clinical Trials & Research",
    stage: "Treatment",
    substage: "Advanced Therapies",
    nodeType: "info",
    status: "available",
    description: "Participation in research studies exploring new treatments and understanding PD.",
    videoTitle: "Ask the MD: Parkinson's Diagnosis and Biomarkers (MJFF)",
    aboutStation: "Clinical trials test new drugs, gene therapies, biomarkers and telemedicine approaches. Participating contributes to scientific progress and may offer access to novel treatments.",
    actionToTake: "Discuss with your physician whether a clinical trial is appropriate. Visit clinicaltrials.gov or the Fox Trial Finder to search for relevant studies.",
    neuroQueryPrompts: [
      "How do I find clinical trials for Parkinson's?",
      "What are the risks and benefits of participating in research?",
      "What questions should I ask before enrolling?",
    ],
    questionsForTeam: [
      "Are there any trials you recommend for my situation?",
      "How would participating affect my current treatment?",
    ],
    additionalResources: [
      "clinicaltrials.gov",
      "Michael J. Fox Foundation Fox Trial Finder",
    ],
  },
  {
    id: "treat-11",
    title: "Motor Complications & Progression",
    stage: "Treatment",
    substage: "Advanced Therapies",
    nodeType: "choice",
    status: "available",
    description: "Evaluate whether current treatment adequately controls symptoms or whether further intervention is needed.",
    aboutStation: "Over time, PD symptoms may progress despite medication adjustments. Motor complications include wearing-off, dyskinesias, freezing of gait and falls.",
    actionToTake: "Yes (significant complications): Consider advanced therapies or referral to a specialist centre. No (stable control): Continue current regimen and monitor regularly.",
    moreDetails: "Frequent falls, medication 'off' periods longer than 'on' periods, or disabling dyskinesia are signs that current therapy may be insufficient. Cognitive decline and hallucinations may limit treatment options.",
    neuroQueryPrompts: [
      "How do I know if my 'off' periods are severe enough to warrant advanced therapy?",
      "Are there strategies to reduce freezing of gait?",
    ],
    questionsForTeam: [
      "At what point should I consider an infusion pump or DBS?",
      "Are there new medications that could help?",
    ],
    considerations: "Quality of life, risk of surgery, support network, cost and personal goals.",
    additionalResources: [
      "APDA information on motor complications",
    ],
  },

  // ============================================
  // LIVING STAGE
  // ============================================

  // Substage: Early Stage (I-II)
  {
    id: "living-1",
    title: "Stay Active & Maintain Independence",
    stage: "Living",
    substage: "Early Stage (I-II)",
    nodeType: "info",
    status: "available",
    description: "Maintaining physical activity and independence in the early years of PD.",
    videoTitle: "Exercise and Early Parkinson's",
    aboutStation: "In stages I–II, symptoms are usually mild and unilateral. The Family Caregiver Alliance emphasises staying active, exercising and preparing for the future. Regular exercise may slow disease progression and improves mood and mobility.",
    actionToTake: "Engage in aerobic exercise (walking, cycling), strength training and stretching. Continue working and hobbies as tolerated. Seek ergonomic adjustments at work. Join support groups for motivation.",
    moreDetails: "Early stage PD does not usually require assistive devices, but planning ahead is beneficial. Balance exercises like tai chi and dance can improve stability. Social activities maintain cognitive health.",
    neuroQueryPrompts: [
      "Which exercises are most beneficial in early PD?",
      "How do I stay motivated to exercise regularly?",
      "What home adaptations can help maintain independence?",
    ],
    questionsForTeam: [
      "Should I see a physiotherapist even if my symptoms are mild?",
      "Are there community programs tailored to people with early PD?",
      "When should I start talking about future care planning?",
    ],
    considerations: "Personal interests, time commitments, access to exercise facilities, energy levels.",
    additionalResources: [
      "Parkinson's Foundation Newly Diagnosed toolkit",
      "Local Rock Steady Boxing and dance classes",
    ],
  },
  {
    id: "living-2",
    title: "Disclosing Diagnosis & Planning Ahead",
    stage: "Living",
    substage: "Early Stage (I-II)",
    nodeType: "info",
    status: "available",
    description: "Communicating your diagnosis and beginning financial and legal planning.",
    videoTitle: "Talking About Your Parkinson's Diagnosis",
    aboutStation: "Deciding when and how to share your diagnosis with family, friends and employers is personal. Early disclosure allows planning for future care needs, legal arrangements and workplace accommodations. The Parkinson's Foundation recommends starting advance care planning discussions early.",
    actionToTake: "Inform close family and friends at your own pace. Discuss accommodations with your employer if symptoms affect work. Meet with an attorney to complete advance directives and durable power of attorney. Review insurance and disability benefits.",
    moreDetails: "Advance care planning includes choosing a health proxy and discussing scenarios where you might not be able to make decisions. Early financial planning helps manage potential work reduction and medical expenses.",
    neuroQueryPrompts: [
      "When should I tell my employer about my diagnosis?",
      "How do I start conversations about my future care preferences?",
      "What legal documents should I complete now?",
    ],
    questionsForTeam: [
      "Do you have resources for advance care planning?",
      "How might PD affect my ability to work in the future?",
      "Should I consult a social worker or financial adviser?",
    ],
    considerations: "Job demands, personal comfort with disclosure, family dynamics, local laws around employment and disability.",
    additionalResources: [
      "Parkinson's Foundation planning ahead guide",
    ],
  },
  {
    id: "living-3",
    title: "Mental Health & Support (Early Stage)",
    stage: "Living",
    substage: "Early Stage (I-II)",
    nodeType: "info",
    status: "available",
    description: "Addressing depression, anxiety and building a support network in early PD.",
    videoTitle: "Mental Health in Early Parkinson's",
    aboutStation: "Depression and anxiety are common even in early PD. Mental health care and social support improve quality of life. Support groups, counselling and mindfulness practices can help manage stress.",
    actionToTake: "Discuss mood changes with your doctor; they may recommend counselling or medication. Join support groups to share experiences. Practise mindfulness or relaxation techniques. Engage family and friends for emotional support.",
    moreDetails: "Distinguish between normal adjustment reactions and clinical depression. Early cognitive screening may establish a baseline. Sleep disturbances can worsen mood—maintain good sleep hygiene.",
    neuroQueryPrompts: [
      "Is what I'm feeling depression or normal adjustment?",
      "How do I find a therapist familiar with PD?",
      "What relaxation techniques can reduce anxiety?",
    ],
    questionsForTeam: [
      "Are antidepressants safe with my PD medications?",
      "How do we monitor cognitive changes over time?",
      "What local support groups do you recommend?",
    ],
    considerations: "Stigma around mental health, insurance coverage for therapy, willingness to share experiences, access to mental health providers.",
    additionalResources: [
      "NINDS information on mental health in PD",
      "Parkinson's Foundation support groups",
    ],
  },

  // Substage: Mid Stage (III)
  {
    id: "living-4",
    title: "Balance & Mobility Challenges",
    stage: "Living",
    substage: "Mid Stage (III)",
    nodeType: "info",
    status: "available",
    description: "Preventing falls and adapting mobility as PD progresses.",
    videoTitle: "Balance, Falls and Parkinson's",
    aboutStation: "In mid-stage PD, symptoms affect both sides of the body and balance becomes impaired. Falls are a major concern, and proactive measures can reduce risk. Assistive devices like canes or walkers and home modifications improve safety.",
    actionToTake: "Remove tripping hazards, install grab bars, use non-slip mats. Work with a physiotherapist on balance and gait training. Consider using a cane or walker; practice turning techniques to reduce freezing. Evaluate medications that may increase dizziness.",
    moreDetails: "Strength training and balance exercises like tai chi reduce fall risk. Occupational therapists can recommend home modifications. Orthostatic hypotension (drop in blood pressure on standing) may cause dizziness; treat with hydration, compression stockings and medication adjustments.",
    neuroQueryPrompts: [
      "How do I decide between a cane and a walker?",
      "What exercises specifically target balance problems?",
      "How do I manage orthostatic hypotension?",
    ],
    questionsForTeam: [
      "Should I see a physiotherapist for balance training?",
      "Are there medications causing my dizziness?",
      "What local programs provide fall prevention training?",
    ],
    considerations: "Safety vs independence, cost of home modifications, acceptance of assistive devices.",
    additionalResources: [
      "APDA webinar on balance and falls",
      "Occupational therapist home safety checklists",
    ],
  },
  {
    id: "living-5",
    title: "Driving & Work Adjustments",
    stage: "Living",
    substage: "Mid Stage (III)",
    nodeType: "info",
    status: "available",
    description: "Assessing driving safety and adapting work or daily tasks during mid-stage PD.",
    videoTitle: "Driving and Parkinson's",
    aboutStation: "PD may slow reaction times and impair judgement, which affects driving. Workplace tasks may need adjustments to accommodate motor symptoms or fatigue. Assessing when to reduce or stop driving is an important safety decision.",
    actionToTake: "Get a formal driving assessment if you or loved ones notice driving issues. Explore alternative transportation options. Talk with your employer about adjustments like flexible hours, reduced manual tasks or ergonomic tools. Consider occupational therapy evaluation for job modifications.",
    moreDetails: "Reaction time tests can help determine driving safety. Work adjustments may include voice recognition software, adapted keyboards or shorter shifts. Plan for transitions if driving is discontinued.",
    neuroQueryPrompts: [
      "What signs indicate I should stop driving?",
      "How do I approach my employer about modifications?",
      "What mobility services are available in my area?",
    ],
    questionsForTeam: [
      "Can you refer me for a driving evaluation?",
      "How might medication adjustments affect my alertness?",
      "Are there vocational rehabilitation services for PD?",
    ],
    considerations: "Safety of self and others, independence vs convenience, job requirements, cost of transportation alternatives.",
    additionalResources: [
      "Local driving assessment centres",
      "Parkinson's Foundation driving safety tips",
    ],
  },
  {
    id: "living-6",
    title: "Non-Motor & Medication (Mid Stage)",
    stage: "Living",
    substage: "Mid Stage (III)",
    nodeType: "info",
    status: "available",
    description: "Managing non-motor symptoms and re-evaluating medications in mid-stage PD.",
    videoTitle: "Non-Motor Symptoms in Parkinson's",
    aboutStation: "Non-motor symptoms like constipation, urinary urgency, sleep problems and mood disorders may worsen in mid-stage PD. Medication side effects (hallucinations, confusion) may emerge as doses increase. Managing these issues requires collaboration with healthcare providers.",
    actionToTake: "Monitor for blood pressure drops, constipation, urinary urgency and depression. Discuss these symptoms with your doctor; treatments include dietary changes, medications, pelvic floor therapy and antidepressants. Review medication regimen for drugs that worsen symptoms.",
    moreDetails: "Cognitive changes may appear; cognitive screening and neuropsychological evaluation can establish baseline and guide interventions. Sleep disturbances (REM sleep behaviour disorder) may require melatonin or clonazepam.",
    neuroQueryPrompts: [
      "How can I manage urinary urgency at work or in public?",
      "What strategies help with constipation?",
      "What signs of cognitive change should I watch for?",
    ],
    questionsForTeam: [
      "Should we adjust medications to reduce side effects?",
      "Are there medications to treat orthostatic hypotension?",
      "When should I see a neuropsychologist?",
    ],
    considerations: "Effect on quality of life, medication tolerance, access to specialists (urologist, psychiatrist).",
    additionalResources: [
      "NINDS information on non-motor symptoms",
      "Parkinson's Foundation guides for constipation and urinary issues",
    ],
  },

  // Substage: Advanced Stage (IV-V)
  {
    id: "living-7",
    title: "Severe Disability & Caregiver Support",
    stage: "Living",
    substage: "Advanced Stage (IV-V)",
    nodeType: "info",
    status: "available",
    description: "Managing daily care when mobility is severely limited and supporting caregivers.",
    videoTitle: "Caregiving in Advanced Parkinson's",
    aboutStation: "In stages IV–V, mobility is severely restricted; patients may be wheelchair-bound or bedridden and require full-time assistance. The Family Caregiver Alliance highlights the need for caregivers to prepare emotionally and practically for increased responsibilities.",
    actionToTake: "Assess the need for assistive equipment (wheelchairs, hospital beds, hoists). Arrange for home health aides or respite care to reduce caregiver burden. Ensure caregivers practise proper lifting and transfer techniques to prevent injury. Use community resources like Meals on Wheels and respite services.",
    moreDetails: "Skin breakdown and pressure sores are risks in immobile patients; perform regular repositioning and skin checks. Constipation and urinary retention may require catheter care or bowel regimen. Provide emotional support for both patient and caregiver.",
    neuroQueryPrompts: [
      "How do we prevent skin breakdown and contractures?",
      "What community services can provide respite care?",
      "How can caregivers cope with emotional stress and burnout?",
    ],
    questionsForTeam: [
      "What equipment and home modifications are necessary?",
      "How do we manage bowel and bladder issues?",
      "Where can caregivers get training on lifting and transfers?",
    ],
    considerations: "Financial resources for paid caregivers, caregiver health, patient comfort and dignity, cultural expectations around caregiving.",
    additionalResources: [
      "Family Caregiver Alliance guidance",
      "Johns Hopkins caregiver tips",
    ],
  },
  {
    id: "living-8",
    title: "Palliative Care & Symptom Management",
    stage: "Living",
    substage: "Advanced Stage (IV-V)",
    nodeType: "info",
    status: "available",
    description: "Integrating palliative care to manage complex symptoms and enhance quality of life.",
    videoTitle: "Palliative Care in Parkinson's Disease",
    aboutStation: "Palliative care aims to relieve suffering and improve quality of life by addressing physical, emotional and spiritual needs. It can be provided alongside disease-directed therapies and helps with decision making about feeding tubes, hospitalisation and resuscitation.",
    actionToTake: "Engage a palliative care team early to address pain, nausea, constipation, anxiety and sleep issues. Discuss goals of care and treatment preferences. Explore hospice services when appropriate. Include social workers, chaplains and counsellors for holistic support.",
    moreDetails: "Palliative care is not only for end of life. Symptom management may include opioid analgesics, laxatives, antidepressants and non-pharmacologic therapies.",
    neuroQueryPrompts: [
      "What is the difference between palliative care and hospice?",
      "How do we decide when to start palliative care?",
      "What support do palliative care teams offer caregivers?",
    ],
    questionsForTeam: [
      "When should we involve a palliative care specialist?",
      "How are symptoms like pain and anxiety managed?",
      "What hospice options are available in our area?",
    ],
    considerations: "Personal values, religious or cultural beliefs, prognosis, caregiver readiness.",
    additionalResources: [
      "Parkinson's Foundation palliative care webinar",
      "NINDS information on palliative care and hospice",
    ],
  },
  {
    id: "living-9",
    title: "End-of-Life Planning & Legal Considerations",
    stage: "Living",
    substage: "Advanced Stage (IV-V)",
    nodeType: "info",
    status: "available",
    description: "Preparing legal documents and making decisions about end-of-life care.",
    videoTitle: "Planning Ahead: Parkinson's and Advance Directives",
    aboutStation: "Advance care planning aligns treatment with personal values. The Parkinson's Foundation recommends starting these discussions early and involving social workers or chaplains.",
    actionToTake: "Discuss and document preferences for life-sustaining treatments (resuscitation, feeding tubes, ventilation). Complete advance directives, living wills and durable power of attorney. Review and update these documents regularly. Communicate wishes with family, caregivers and healthcare providers.",
    moreDetails: "End-of-life planning may include decisions about hospice enrolment, preferred place of care (home, hospice, nursing facility) and funeral arrangements. Consider cultural and spiritual beliefs in decision making. Educate caregivers about signs that indicate the final stages.",
    neuroQueryPrompts: [
      "What legal documents should I prepare?",
      "How do I talk to my family about end-of-life wishes?",
      "What hospice options and benefits exist?",
    ],
    questionsForTeam: [
      "Who can help us complete advance directives?",
      "What are signs that indicate we should shift focus to comfort care?",
      "Are there resources for spiritual or cultural support?",
    ],
    considerations: "Legal requirements in your region, family dynamics, values and beliefs, financial resources.",
    additionalResources: [
      "Parkinson's Foundation planning ahead guide",
      "Hospice and home health services directories",
    ],
  },

  // Substage: Daily Living
  {
    id: "living-10",
    title: "Hospital Care & Medication Timing",
    stage: "Living",
    substage: "Daily Living",
    nodeType: "info",
    status: "available",
    description: "Ensuring safe and effective care during hospitalisation.",
    videoTitle: "Parkinson's Foundation Hospital Safety Guidelines",
    aboutStation: "People with PD are hospitalised more frequently and often do not receive medications on time, leading to complications. The Parkinson's Foundation notes that 75% of hospitalised PD patients do not get their medications on schedule, resulting in falls, hallucinations and prolonged stays.",
    actionToTake: "Before a planned hospital stay, provide staff with a medication schedule (including brand names, dosages and exact times). Bring your own medications if allowed. Wear a medical alert bracelet. In emergencies, ensure family advocates for timely PD medications and avoidance of contraindicated drugs (e.g., haloperidol, metoclopramide).",
    moreDetails: "Hospitals may substitute medications or delay doses due to procedures. Ask the care team to contact the neurologist if PD medications cannot be given. Watch for symptoms worsening or neuroleptic malignant syndrome if medications are withheld.",
    neuroQueryPrompts: [
      "What medications are unsafe for PD patients?",
      "How do we ensure the hospital follows PD medication schedules?",
    ],
    questionsForTeam: [
      "Can I use my home medication supply in the hospital?",
      "Who ensures my medication schedule is maintained?",
    ],
    considerations: "Hospital policies, presence of a caregiver to advocate, knowledge of contraindicated drugs.",
    additionalResources: [
      "Parkinson's Foundation Hospital Safety Kit",
      "Hospital care recommendation guidelines (Parkinson's Foundation 2023)",
    ],
  },
  {
    id: "living-11",
    title: "Caregiver Support & Self-Care",
    stage: "Living",
    substage: "Daily Living",
    nodeType: "info",
    status: "available",
    description: "Guidance for caregivers to maintain their own health and well-being.",
    videoTitle: "Caregiving and Parkinson's (Johns Hopkins Medicine)",
    aboutStation: "Caring for someone with PD is demanding. The Johns Hopkins Parkinson's Disease and Movement Disorders Center advises caregivers to educate themselves, attend appointments, be observant of changes, be flexible and ensure medications are taken on time. Caregivers must also take care of their own physical and emotional health.",
    actionToTake: "Join a caregiver support group. Schedule respite breaks. Learn about PD treatments and symptoms. Seek help from family, friends or professional caregivers when needed. Maintain your own medical appointments.",
    moreDetails: "Watch for signs of caregiver burnout (depression, anger, withdrawal). Develop a safety net by building a care team (family, friends, paid aides). Consider counselling or therapy for stress management.",
    neuroQueryPrompts: [
      "How do I set boundaries and ask for help?",
      "What legal and financial planning should we do?",
      "How do I communicate effectively with health professionals?",
    ],
    questionsForTeam: [
      "Are there local caregiver classes or support services?",
      "How do I coordinate care between specialists?",
    ],
    considerations: "Balancing work and caregiving responsibilities, financial strain, cultural expectations.",
    additionalResources: [
      "Johns Hopkins caregiver tips",
      "Family Caregiver Alliance resources and national respite network",
    ],
  },
  {
    id: "living-12",
    title: "Exercise & Lifestyle",
    stage: "Living",
    substage: "Daily Living",
    nodeType: "info",
    status: "available",
    description: "Physical activity, diet and mental health strategies to enhance well-being.",
    videoTitle: "Parkinson's Disease and Exercise (APDA Spotlights)",
    aboutStation: "Regular exercise (aerobic, strength, balance, flexibility) improves mobility and may slow PD progression. Diet rich in fibre, fluids and antioxidants supports general health. Mental health support (mindfulness, counselling) addresses depression and anxiety.",
    actionToTake: "Establish a routine of at least 150 minutes per week of moderate aerobic exercise. Include strength training twice per week and daily stretching. Eat a balanced diet and avoid protein at the time of levodopa doses to optimise absorption. Practise relaxation techniques.",
    moreDetails: "Social engagement (support groups, volunteering) reduces isolation. Cognitive exercises (puzzles, reading) maintain mental acuity. Sleep hygiene (regular sleep schedule, limiting caffeine) improves rest.",
    neuroQueryPrompts: [
      "What specific exercises help with rigidity and balance?",
      "How do I schedule my protein intake around my medications?",
      "Are there community classes for PD-friendly exercise?",
    ],
    questionsForTeam: [
      "What precautions should I take before starting an exercise program?",
      "Do I need referral to a dietitian?",
    ],
    considerations: "Personal interests, physical limitations, access to facilities, support from caregivers.",
    additionalResources: [
      "NICE guideline on non-pharmacological management",
      "Parkinson's Foundation exercise recommendations",
    ],
  },
  {
    id: "living-13",
    title: "Safety & Home Modifications",
    stage: "Living",
    substage: "Daily Living",
    nodeType: "info",
    status: "available",
    description: "Preventing falls and injuries in the home environment.",
    videoTitle: "Home Safety Tips for Parkinson's Disease (Parkinson's UK)",
    aboutStation: "PD increases risk of falls due to balance and gait disturbances. Home modifications and assistive devices can reduce this risk.",
    actionToTake: "Remove tripping hazards (loose rugs, clutter). Install grab bars in bathrooms and near stairs. Use adequate lighting. Consider using a cane, walker or wheelchair as recommended by a physiotherapist. Keep frequently used items within reach to avoid climbing.",
    moreDetails: "Evaluate footwear to ensure non-slip soles. Consider an occupational therapy home assessment. Use medical alert systems for emergencies.",
    neuroQueryPrompts: [
      "What modifications provide the most benefit for preventing falls?",
      "How do I choose between a cane and a walker?",
    ],
    questionsForTeam: [
      "Can you refer us to an occupational therapist for a home assessment?",
      "What community resources help with home modifications?",
    ],
    considerations: "Costs, rental vs purchase of equipment, home ownership vs rental, insurance coverage.",
    additionalResources: [
      "Parkinson's UK home safety guide",
      "National falls prevention guidelines",
    ],
  },
  {
    id: "living-14",
    title: "Emotional & Mental Health",
    stage: "Living",
    substage: "Daily Living",
    nodeType: "info",
    status: "available",
    description: "Managing depression, anxiety, cognitive decline and hallucinations.",
    videoTitle: "Mental Health and Parkinson's Disease (Expert Briefing)",
    aboutStation: "Depression and anxiety affect up to half of people with PD. Cognitive decline may progress to Parkinson's disease dementia. Hallucinations can be medication-induced or part of disease progression.",
    actionToTake: "Discuss mood or cognitive changes with your healthcare provider; treatments include counselling, antidepressants, cognitive behavioural therapy and medication adjustments. Keep a routine, maintain social connections and practise stress reduction techniques.",
    moreDetails: "Screen for depression regularly. Caregivers should be aware of signs of dementia (memory loss, executive dysfunction). Hallucinations may necessitate lowering dopaminergic medications or using atypical antipsychotics under specialist supervision.",
    neuroQueryPrompts: [
      "Is what I'm feeling depression or just normal sadness?",
      "How do we manage hallucinations without worsening motor symptoms?",
      "What cognitive exercises can help maintain memory?",
    ],
    questionsForTeam: [
      "Are antidepressants safe with PD medications?",
      "Should we see a neuropsychologist?",
      "How do we differentiate PD dementia from Alzheimer's disease?",
    ],
    considerations: "Stigma around mental health, side effects of psychiatric medications, caregiver burden.",
    additionalResources: [
      "NINDS information on depression in PD",
      "Parkinson's Foundation mental health resources",
    ],
  },
  {
    id: "living-15",
    title: "Allied Health Therapies",
    stage: "Living",
    substage: "Daily Living",
    nodeType: "choice",
    status: "available",
    description: "Determining when to involve physiotherapy, speech therapy and occupational therapy.",
    aboutStation: "Allied health services play a crucial role in PD management. NICE guidelines recommend offering physiotherapy, occupational therapy and speech and language therapy to people whose motor symptoms impact daily living.",
    actionToTake: "Yes (functional limitations present): Request referrals for the appropriate therapies. These services can improve gait, hand function, voice projection and swallowing. No (no limitations yet): Continue monitoring; early referral may still be beneficial for education and preventive strategies.",
    moreDetails: "Physiotherapists focus on gait, balance and posture; occupational therapists adapt activities and environments; speech therapists address dysarthria and swallowing. Early engagement may prevent complications.",
    neuroQueryPrompts: [
      "What benefits can I expect from physiotherapy at my stage?",
      "How do occupational therapists help with fine motor skills like buttoning shirts?",
    ],
    questionsForTeam: [
      "Do I need a referral for therapy services?",
      "How often should I attend sessions?",
    ],
    considerations: "Access to therapists, insurance coverage, time commitment.",
    additionalResources: [
      "NICE guideline on allied health interventions",
      "Local therapy clinics and telehealth options",
    ],
  },
];

// Get the current user stage (first one marked as userIsHere, otherwise first available)
export const getCurrentLesson = (): LessonNode | undefined => {
  return allLessons.find((lesson) => lesson.userIsHere) || allLessons.find((lesson) => lesson.status === "available");
};

// Get today's lesson based on current progress
export const getTodaysLesson = (): LessonNode => {
  const current = getCurrentLesson();
  return current || allLessons[0];
};

// Get lessons by stage
export const getLessonsByStage = (stage: string): LessonNode[] => {
  return allLessons.filter((lesson) => lesson.stage === stage);
};

// Get lessons by substage
export const getLessonsBySubstage = (stage: string, substage: string): LessonNode[] => {
  return allLessons.filter((lesson) => lesson.stage === stage && lesson.substage === substage);
};

// Get substages for a stage
export const getSubstagesForStage = (stage: string): string[] => {
  return substages[stage] || [];
};

// Get node type icon
export const getNodeTypeLabel = (nodeType: NodeType): string => {
  switch (nodeType) {
    case "entry": return "Entry Point";
    case "choice": return "Decision Point";
    case "info": return "Information";
    case "subsection": return "Section";
  }
};
