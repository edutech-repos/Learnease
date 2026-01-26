import { motion } from 'motion/react';
import { ArrowLeft, Gamepad2, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface TrendingTopicViewProps {
  topic: {
    title: string;
    icon: string;
    difficulty: string;
  } | null;
  onClose: () => void;
}

// Mock topic content database
const topicContent: Record<string, { content: string; quiz: any[] }> = {
  'Quantum Physics 101': {
    content: `
# Introduction to Quantum Physics

Quantum physics is the study of matter and energy at the smallest scales, where the classical laws of physics no longer apply.

## What is Quantum Mechanics?

Quantum mechanics is a fundamental theory in physics that describes nature at the smallest scales of energy levels of atoms and subatomic particles.

**Key Principles:**
- Energy is quantized and exists in discrete packets called "quanta"
- Wave-particle duality: particles can exhibit wave-like behavior
- The Uncertainty Principle: you cannot simultaneously know both position and momentum with perfect precision
- Superposition: particles can exist in multiple states simultaneously until measured

## Wave-Particle Duality

One of the most fascinating aspects of quantum mechanics is that particles like electrons and photons can behave both as particles and as waves.

**The Double-Slit Experiment:**
- When electrons pass through two slits, they create an interference pattern
- This suggests wave-like behavior
- But when observed, they behave like particles
- The act of observation affects the outcome

## Heisenberg's Uncertainty Principle

Werner Heisenberg discovered that there's a fundamental limit to how precisely we can know certain pairs of properties of a particle.

**Formula:** ΔxΔp ≥ ℏ/2

Where:
- Δx is the uncertainty in position
- Δp is the uncertainty in momentum
- ℏ is the reduced Planck constant

## Quantum Superposition

A quantum system can exist in multiple states simultaneously until it is measured.

**Schrödinger's Cat:**
- A thought experiment illustrating superposition
- A cat in a box can be both alive and dead until observed
- Demonstrates the paradox of quantum superposition at macro scale

## Applications

Quantum physics isn't just theoretical - it has practical applications:

- **Quantum Computing**: Using quantum bits (qubits) for exponentially faster computation
- **Quantum Cryptography**: Unbreakable encryption using quantum entanglement
- **Semiconductor Technology**: Modern electronics rely on quantum mechanics
- **Medical Imaging**: MRI and PET scans use quantum principles
    `,
    quiz: [
      {
        question: 'What does wave-particle duality mean?',
        options: [
          'Particles can only behave as waves',
          'Particles can behave as both waves and particles',
          'Waves can only behave as particles',
          'Waves and particles are completely different'
        ],
        correctAnswer: 1,
        explanation: 'Wave-particle duality is the concept that all particles exhibit both wave and particle properties. This is a fundamental principle of quantum mechanics demonstrated by experiments like the double-slit experiment.'
      },
      {
        question: 'According to Heisenberg\'s Uncertainty Principle, what cannot be simultaneously known with perfect precision?',
        options: [
          'Energy and time',
          'Position and momentum',
          'Speed and direction',
          'Mass and velocity'
        ],
        correctAnswer: 1,
        explanation: 'The Heisenberg Uncertainty Principle states that you cannot simultaneously know both the position and momentum of a particle with perfect precision. The more precisely you know one, the less precisely you can know the other.'
      },
      {
        question: 'What is quantum superposition?',
        options: [
          'When particles stack on top of each other',
          'When a quantum system exists in multiple states simultaneously until measured',
          'When quantum states cancel each other out',
          'When particles move faster than light'
        ],
        correctAnswer: 1,
        explanation: 'Quantum superposition is the principle that a quantum system can exist in multiple states simultaneously until it is measured or observed. This is famously illustrated by Schrödinger\'s cat thought experiment.'
      },
      {
        question: 'What are "quanta" in quantum physics?',
        options: [
          'Very small particles',
          'Discrete packets of energy',
          'Types of radiation',
          'Mathematical equations'
        ],
        correctAnswer: 1,
        explanation: 'Quanta are discrete packets of energy. The term "quantum" comes from this concept that energy is not continuous but comes in specific, discrete amounts. This is one of the fundamental principles that distinguishes quantum physics from classical physics.'
      },
      {
        question: 'Which real-world technology does NOT rely on quantum mechanics?',
        options: [
          'MRI scanners',
          'Quantum computers',
          'Steam engines',
          'Semiconductor chips'
        ],
        correctAnswer: 2,
        explanation: 'Steam engines operate on classical thermodynamics principles and do not require quantum mechanics to function. MRI scanners, quantum computers, and semiconductor chips all rely on quantum mechanical principles for their operation.'
      }
    ]
  },
  'French Revolution': {
    content: `
# The French Revolution (1789-1799)

The French Revolution was a period of radical social and political change in France that had a lasting impact on the world.

## Causes of the Revolution

### Economic Crisis
The French monarchy faced severe financial difficulties due to:
- Costly wars, including support for the American Revolution
- Lavish spending by the royal court at Versailles
- An inefficient tax system that burdened the common people
- Poor harvests leading to food shortages and high bread prices

### Social Inequality
French society was divided into three estates:
- **First Estate**: Clergy (about 1% of population)
- **Second Estate**: Nobility (about 2% of population)
- **Third Estate**: Everyone else (about 97% of population)

**The Problem:**
- The First and Second Estates enjoyed privileges and paid little tax
- The Third Estate bore the tax burden despite having no political power
- Growing middle class (bourgeoisie) resented their lack of influence

### Enlightenment Ideas
Philosophers like Voltaire, Rousseau, and Montesquieu spread ideas about:
- Natural rights and equality
- Popular sovereignty
- Separation of powers
- Liberty and freedom

## Key Events

### The Estates-General (May 1789)
King Louis XVI called the Estates-General to solve the financial crisis. The Third Estate demanded more representation, leading to conflict.

### Tennis Court Oath (June 20, 1789)
Members of the Third Estate vowed not to separate until a new constitution was established.

### Storming of the Bastille (July 14, 1789)
Parisians stormed the Bastille prison, a symbol of royal tyranny. This date is now France's national day.

### Declaration of the Rights of Man (August 1789)
Proclaimed fundamental rights including:
- Liberty, property, security, and resistance to oppression
- Equality before the law
- Freedom of speech and religion

### Reign of Terror (1793-1794)
Led by Maximilien Robespierre and the Jacobins:
- Thousands executed by guillotine, including King Louis XVI and Queen Marie Antoinette
- Extreme measures to defend the revolution from internal and external enemies
- Eventually ended with Robespierre's own execution

## Impact and Legacy

**Short-term:**
- End of absolute monarchy in France
- Rise of Napoleon Bonaparte
- Spread of revolutionary ideas across Europe

**Long-term:**
- Inspiration for democratic movements worldwide
- Establishment of principles of human rights
- Development of modern political ideologies (liberalism, conservatism, socialism)

## Key Figures

- **Louis XVI**: King of France, executed in 1793
- **Marie Antoinette**: Queen of France, executed in 1793
- **Maximilien Robespierre**: Leader during Reign of Terror
- **Napoleon Bonaparte**: Rose to power in the revolution's aftermath
- **Georges Danton**: Revolutionary leader, later executed
    `,
    quiz: [
      {
        question: 'What were the three estates in pre-revolutionary French society?',
        options: [
          'Rich, Middle Class, and Poor',
          'Clergy, Nobility, and Commoners',
          'Royalty, Military, and Peasants',
          'Urban, Rural, and Coastal'
        ],
        correctAnswer: 1,
        explanation: 'The three estates were: First Estate (Clergy), Second Estate (Nobility), and Third Estate (Commoners - everyone else). The Third Estate made up about 97% of the population but had no political power.'
      },
      {
        question: 'When was the Bastille stormed?',
        options: [
          'July 4, 1789',
          'July 14, 1789',
          'August 14, 1789',
          'September 1, 1789'
        ],
        correctAnswer: 1,
        explanation: 'The Bastille was stormed on July 14, 1789, marking a pivotal moment in the French Revolution. This date is now celebrated as Bastille Day, France\'s national holiday.'
      },
      {
        question: 'Who led the Reign of Terror?',
        options: [
          'Napoleon Bonaparte',
          'King Louis XVI',
          'Maximilien Robespierre',
          'Georges Danton'
        ],
        correctAnswer: 2,
        explanation: 'Maximilien Robespierre and the Jacobins led the Reign of Terror from 1793-1794, during which thousands were executed by guillotine, including the king and queen.'
      },
      {
        question: 'What was NOT a cause of the French Revolution?',
        options: [
          'Economic crisis and heavy taxation',
          'Social inequality between estates',
          'Influence of Enlightenment ideas',
          'Invasion by foreign powers'
        ],
        correctAnswer: 3,
        explanation: 'The main causes were economic crisis, social inequality, and Enlightenment ideas. Foreign invasion was not a cause but rather a consequence - European monarchies attacked revolutionary France to prevent the spread of revolutionary ideas.'
      },
      {
        question: 'What did the Declaration of the Rights of Man proclaim?',
        options: [
          'The divine right of kings',
          'Fundamental rights including liberty and equality',
          'The establishment of a new monarchy',
          'France\'s independence from Britain'
        ],
        correctAnswer: 1,
        explanation: 'The Declaration of the Rights of Man and of the Citizen proclaimed fundamental rights including liberty, property, security, resistance to oppression, equality before the law, and freedom of speech and religion.'
      }
    ]
  },
  'Python Basics': {
    content: `
# Python Programming Basics

Python is a high-level, interpreted programming language known for its simplicity and readability.

## Why Learn Python?

**Advantages:**
- Easy to learn and read - syntax resembles natural English
- Versatile - used in web development, data science, AI, automation, and more
- Large community and extensive libraries
- High demand in job market
- Great for beginners and professionals alike

## Basic Syntax

### Variables and Data Types

Python uses dynamic typing - you don't need to declare variable types.

**Basic Data Types:**
- **int**: Integer numbers (e.g., 42, -7, 1000)
- **float**: Decimal numbers (e.g., 3.14, -0.5, 2.0)
- **str**: Text strings (e.g., "Hello", 'Python')
- **bool**: Boolean values (True or False)

**Example:**
\`\`\`python
name = "Alice"  # string
age = 25        # integer
height = 5.6    # float
is_student = True  # boolean
\`\`\`

### Print Function

The \`print()\` function displays output:

\`\`\`python
print("Hello, World!")
print("My age is:", age)
\`\`\`

### Comments

Comments help explain code and are ignored by Python:

\`\`\`python
# This is a single-line comment

"""
This is a
multi-line comment
"""
\`\`\`

## Control Structures

### If-Else Statements

Make decisions in your code:

\`\`\`python
age = 18

if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")
\`\`\`

### Loops

**For Loop** - iterate over a sequence:

\`\`\`python
for i in range(5):
    print(i)  # Prints 0, 1, 2, 3, 4

fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

**While Loop** - repeat while condition is true:

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## Data Structures

### Lists

Ordered, mutable collections:

\`\`\`python
numbers = [1, 2, 3, 4, 5]
numbers.append(6)  # Add item
numbers[0]  # Access first item (returns 1)
\`\`\`

### Dictionaries

Key-value pairs:

\`\`\`python
person = {
    "name": "Bob",
    "age": 30,
    "city": "New York"
}
print(person["name"])  # Access by key
\`\`\`

## Functions

Reusable blocks of code:

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

message = greet("Alice")
print(message)  # Prints: Hello, Alice!
\`\`\`

## Common Applications

- **Web Development**: Flask, Django frameworks
- **Data Science**: NumPy, Pandas, Matplotlib
- **Machine Learning**: TensorFlow, scikit-learn
- **Automation**: Scripting repetitive tasks
- **Game Development**: Pygame library
    `,
    quiz: [
      {
        question: 'Which of the following is NOT a basic Python data type?',
        options: [
          'int',
          'float',
          'str',
          'decimal'
        ],
        correctAnswer: 3,
        explanation: 'The basic Python data types are int (integer), float (decimal numbers), str (string), and bool (boolean). "decimal" is not a basic built-in type, though there is a Decimal module for precise decimal calculations.'
      },
      {
        question: 'What will this code print? print(5 + 3 * 2)',
        options: [
          '16',
          '11',
          '13',
          '10'
        ],
        correctAnswer: 1,
        explanation: 'Python follows standard mathematical order of operations (PEMDAS). Multiplication is performed before addition, so 3 * 2 = 6, then 5 + 6 = 11.'
      },
      {
        question: 'What is the correct syntax for a single-line comment in Python?',
        options: [
          '// This is a comment',
          '/* This is a comment */',
          '# This is a comment',
          '-- This is a comment'
        ],
        correctAnswer: 2,
        explanation: 'In Python, single-line comments start with the # symbol. Everything after # on that line is ignored by the Python interpreter.'
      },
      {
        question: 'Which loop would you use to iterate over items in a list?',
        options: [
          'while loop only',
          'for loop only',
          'Either for or while loop',
          'Python doesn\'t support list iteration'
        ],
        correctAnswer: 2,
        explanation: 'Both for and while loops can be used to iterate over a list, though for loops are more commonly used and considered more "Pythonic" for this purpose. For example: "for item in my_list:" or with a while loop using indexing.'
      },
      {
        question: 'What does the following code do? my_list.append(5)',
        options: [
          'Removes the number 5 from the list',
          'Adds the number 5 to the end of the list',
          'Adds the number 5 to the beginning of the list',
          'Replaces all items with the number 5'
        ],
        correctAnswer: 1,
        explanation: 'The append() method adds an item to the end of a list. In this case, it adds the number 5 to the end of my_list.'
      }
    ]
  },
  'Human Anatomy': {
    content: `
# Introduction to Human Anatomy

Human anatomy is the scientific study of the structure of the human body and its parts.

## Major Body Systems

### Skeletal System

The framework of bones and cartilage that supports the body.

**Functions:**
- Provides structure and shape
- Protects vital organs
- Enables movement (with muscles)
- Produces blood cells (in bone marrow)
- Stores minerals (calcium and phosphorus)

**Key Facts:**
- Adult human has 206 bones
- Babies are born with about 270 bones (some fuse as they grow)
- Longest bone: Femur (thighbone)
- Smallest bone: Stapes (in the ear)

### Muscular System

Over 600 muscles that enable movement and maintain posture.

**Three Types of Muscles:**
- **Skeletal Muscles**: Voluntary muscles attached to bones (e.g., biceps)
- **Smooth Muscles**: Involuntary muscles in organs (e.g., stomach, intestines)
- **Cardiac Muscle**: Special involuntary muscle found only in the heart

**Functions:**
- Movement and locomotion
- Maintain posture
- Generate heat
- Protect organs

### Cardiovascular System

The heart and blood vessels that circulate blood throughout the body.

**Components:**
- **Heart**: Four-chambered pump (2 atria, 2 ventricles)
- **Blood Vessels**: Arteries (carry blood away from heart), veins (return blood to heart), capillaries (tiny exchange vessels)
- **Blood**: Transports oxygen, nutrients, hormones, and waste

**The Heart:**
- Beats about 100,000 times per day
- Pumps about 2,000 gallons of blood daily
- Right side pumps to lungs, left side pumps to body

### Respiratory System

Responsible for breathing and gas exchange.

**Main Organs:**
- **Nose and Nasal Cavity**: Filter, warm, and humidify air
- **Pharynx and Larynx**: Throat and voice box
- **Trachea**: Windpipe leading to lungs
- **Lungs**: Main organs of respiration
- **Diaphragm**: Muscle that drives breathing

**Process:**
- Oxygen is absorbed into blood through alveoli (tiny air sacs)
- Carbon dioxide is expelled as waste
- Average person breathes 12-20 times per minute

### Digestive System

Breaks down food and absorbs nutrients.

**Pathway:**
- **Mouth**: Mechanical (chewing) and chemical (saliva) digestion begins
- **Esophagus**: Transports food to stomach
- **Stomach**: Churns food with acid and enzymes
- **Small Intestine**: Primary site of nutrient absorption
- **Large Intestine**: Absorbs water, forms waste
- **Liver and Pancreas**: Produce digestive enzymes and bile

**Length:**
- Small intestine: About 20 feet long
- Large intestine: About 5 feet long

### Nervous System

Controls and coordinates body functions through electrical signals.

**Two Main Parts:**
- **Central Nervous System (CNS)**: Brain and spinal cord
- **Peripheral Nervous System (PNS)**: All other nerves

**The Brain:**
- Controls thought, memory, emotion, and movement
- Contains about 86 billion neurons
- Uses 20% of body's energy despite being only 2% of body weight

**Three Main Sections:**
- **Cerebrum**: Higher thinking, voluntary movement
- **Cerebellum**: Balance and coordination
- **Brainstem**: Automatic functions (breathing, heart rate)

## Integumentary System

The skin, hair, and nails.

**Skin Functions:**
- Largest organ of the body
- Protects against pathogens and injury
- Regulates body temperature
- Provides sensory information
- Synthesizes vitamin D

**Layers:**
- **Epidermis**: Outer protective layer
- **Dermis**: Contains blood vessels, nerves, hair follicles
- **Hypodermis**: Fat layer for insulation and energy storage
    `,
    quiz: [
      {
        question: 'How many bones does an adult human have?',
        options: [
          '186',
          '206',
          '216',
          '270'
        ],
        correctAnswer: 1,
        explanation: 'An adult human has 206 bones. Babies are born with about 270 bones, but many of these fuse together as the person grows, resulting in 206 bones in adulthood.'
      },
      {
        question: 'Which part of the heart pumps blood to the lungs?',
        options: [
          'Left atrium',
          'Left ventricle',
          'Right atrium',
          'Right ventricle'
        ],
        correctAnswer: 3,
        explanation: 'The right ventricle pumps deoxygenated blood to the lungs. The right side of the heart handles deoxygenated blood, while the left side handles oxygenated blood from the lungs to distribute to the body.'
      },
      {
        question: 'What is the primary function of alveoli in the lungs?',
        options: [
          'Filter air',
          'Produce mucus',
          'Gas exchange (oxygen and carbon dioxide)',
          'Warm incoming air'
        ],
        correctAnswer: 2,
        explanation: 'Alveoli are tiny air sacs in the lungs where gas exchange occurs. Oxygen passes from the alveoli into the blood, and carbon dioxide passes from the blood into the alveoli to be exhaled.'
      },
      {
        question: 'Which of these is NOT a function of the skeletal system?',
        options: [
          'Protecting vital organs',
          'Producing blood cells',
          'Storing minerals',
          'Digesting food'
        ],
        correctAnswer: 3,
        explanation: 'Digesting food is a function of the digestive system, not the skeletal system. The skeletal system provides structure, protects organs, enables movement, produces blood cells in bone marrow, and stores minerals like calcium.'
      },
      {
        question: 'What percentage of the body\'s energy does the brain use?',
        options: [
          '2%',
          '10%',
          '20%',
          '50%'
        ],
        correctAnswer: 2,
        explanation: 'The brain uses about 20% of the body\'s energy despite being only about 2% of body weight. This high energy consumption is due to the constant electrical and chemical activity of billions of neurons.'
      }
    ]
  },
  'Climate Change': {
    content: `
# Understanding Climate Change

Climate change refers to long-term shifts in global temperatures and weather patterns, primarily caused by human activities.

## The Greenhouse Effect

### Natural Greenhouse Effect
The Earth's atmosphere traps some of the sun's heat, keeping our planet warm enough to sustain life.

**How it Works:**
- Sun's radiation reaches Earth
- Earth's surface absorbs energy and heats up
- Heat radiates back toward space as infrared radiation
- Greenhouse gases trap some of this heat in the atmosphere
- This natural process keeps Earth about 33°C warmer than it would be otherwise

### Enhanced Greenhouse Effect
Human activities have intensified the natural greenhouse effect.

**Main Greenhouse Gases:**
- **Carbon Dioxide (CO₂)**: From burning fossil fuels, deforestation
- **Methane (CH₄)**: From agriculture, landfills, natural gas
- **Nitrous Oxide (N₂O)**: From agriculture and industrial processes
- **Water Vapor**: Increases as temperature rises

## Causes of Climate Change

### Human Activities

**Burning Fossil Fuels:**
- Coal, oil, and natural gas for energy and transportation
- Releases CO₂ that was stored underground for millions of years
- Accounts for about 75% of human greenhouse gas emissions

**Deforestation:**
- Trees absorb CO₂ - cutting them down reduces this absorption
- Burning or decomposing trees releases stored carbon
- Amazon rainforest alone absorbs 2 billion tons of CO₂ annually

**Agriculture:**
- Livestock produces methane through digestion
- Rice paddies produce methane in waterlogged conditions
- Fertilizers release nitrous oxide

**Industrial Processes:**
- Manufacturing cement, steel, and chemicals
- Waste management and landfills
- Refrigerants and other synthetic gases

## Effects of Climate Change

### Rising Temperatures
- Global average temperature has increased about 1.1°C since pre-industrial times
- Last decade was the warmest on record
- Heatwaves becoming more frequent and intense

### Melting Ice and Rising Sea Levels
- Arctic sea ice declining at 13% per decade
- Greenland and Antarctic ice sheets losing mass
- Mountain glaciers retreating worldwide
- Sea levels rising about 3.3mm per year
- Threatens coastal cities and small island nations

### Extreme Weather Events
- More frequent and intense hurricanes, typhoons, and cyclones
- Longer and more severe droughts
- Heavier rainfall and flooding
- Wildfires becoming more common and destructive

### Ecosystem Disruption
- Coral reefs bleaching due to warmer ocean temperatures
- Species migration patterns changing
- Some species facing extinction
- Disruption of food chains

### Human Impact
- Threats to food security and agriculture
- Water scarcity in many regions
- Increased spread of diseases
- Climate refugees and migration
- Economic costs of adaptation and damages

## Solutions and Mitigation

### Renewable Energy
- Solar, wind, hydroelectric, and geothermal power
- Reduces reliance on fossil fuels
- Costs of renewables have decreased dramatically

### Energy Efficiency
- Better insulation in buildings
- More efficient appliances and vehicles
- LED lighting
- Smart grids and energy management

### Sustainable Transportation
- Electric and hybrid vehicles
- Public transportation expansion
- Cycling and walking infrastructure
- High-speed rail instead of flights

### Reforestation and Conservation
- Planting trees to absorb CO₂
- Protecting existing forests
- Sustainable forest management
- Restoring degraded ecosystems

### Individual Actions
- Reduce, reuse, recycle
- Eat less meat (especially beef)
- Use public transportation or bike
- Choose renewable energy
- Support climate-conscious businesses and policies

## The Paris Agreement

International agreement to limit global warming to well below 2°C, preferably 1.5°C, compared to pre-industrial levels.

**Key Goals:**
- Countries submit national climate action plans
- Regular progress reviews
- Support for developing nations
- Aim for net-zero emissions by 2050
    `,
    quiz: [
      {
        question: 'What is the primary cause of current climate change?',
        options: [
          'Natural climate cycles',
          'Volcanic eruptions',
          'Human activities, especially burning fossil fuels',
          'Changes in solar radiation'
        ],
        correctAnswer: 2,
        explanation: 'The primary cause of current climate change is human activities, especially the burning of fossil fuels (coal, oil, and natural gas) which releases greenhouse gases like CO₂ into the atmosphere, enhancing the natural greenhouse effect.'
      },
      {
        question: 'Which of these is NOT a greenhouse gas?',
        options: [
          'Carbon dioxide (CO₂)',
          'Methane (CH₄)',
          'Oxygen (O₂)',
          'Nitrous oxide (N₂O)'
        ],
        correctAnswer: 2,
        explanation: 'Oxygen (O₂) is not a greenhouse gas. The main greenhouse gases are carbon dioxide (CO₂), methane (CH₄), nitrous oxide (N₂O), and water vapor. Oxygen makes up about 21% of our atmosphere but doesn\'t trap heat like greenhouse gases do.'
      },
      {
        question: 'What is the Paris Agreement\'s main temperature goal?',
        options: [
          'Limit warming to 0.5°C above pre-industrial levels',
          'Limit warming to well below 2°C, preferably 1.5°C',
          'Limit warming to 3°C',
          'Stop all temperature increase immediately'
        ],
        correctAnswer: 1,
        explanation: 'The Paris Agreement aims to limit global warming to well below 2°C, and preferably to 1.5°C, compared to pre-industrial levels. This is considered crucial to avoid the most catastrophic impacts of climate change.'
      },
      {
        question: 'How does deforestation contribute to climate change?',
        options: [
          'Trees release CO₂ when cut down, and fewer trees mean less CO₂ absorption',
          'It doesn\'t contribute to climate change',
          'It only affects local weather, not global climate',
          'Deforestation actually helps fight climate change'
        ],
        correctAnswer: 0,
        explanation: 'Deforestation contributes to climate change in two ways: 1) When trees are cut down and burned or decompose, they release the CO₂ they had stored, and 2) Fewer trees means less absorption of CO₂ from the atmosphere, as trees naturally absorb CO₂ through photosynthesis.'
      },
      {
        question: 'Which renewable energy source is NOT mentioned in the content?',
        options: [
          'Solar',
          'Wind',
          'Nuclear',
          'Hydroelectric'
        ],
        correctAnswer: 2,
        explanation: 'Nuclear energy is not mentioned in the renewable energy section of the content. The content specifically mentions solar, wind, hydroelectric, and geothermal power as renewable energy sources.'
      }
    ]
  },
  'Shakespeare Works': {
    content: `
# William Shakespeare's Works

William Shakespeare (1564-1616) is widely regarded as the greatest writer in the English language and the world's greatest dramatist.

## Shakespeare's Life

**Early Years:**
- Born in Stratford-upon-Avon, England
- Married Anne Hathaway at age 18
- Had three children: Susanna, and twins Hamnet and Judith

**Career:**
- Moved to London and became an actor and playwright
- Became part-owner of the Globe Theatre
- Wrote approximately 39 plays, 154 sonnets, and several poems
- Retired to Stratford around 1613

## Categories of Plays

### Tragedies

Stories of noble characters whose flaws lead to their downfall.

**Major Tragedies:**

**Hamlet** (c. 1600)
- Prince of Denmark seeks revenge for his father's murder
- Famous for the "To be or not to be" soliloquy
- Explores themes of revenge, madness, and mortality
- "Something is rotten in the state of Denmark"

**Macbeth** (c. 1606)
- Scottish general's ambition leads him to murder
- Influenced by three witches' prophecies
- Themes of ambition, guilt, and fate
- "Out, damned spot!" - Lady Macbeth

**Romeo and Juliet** (c. 1595)
- Two young lovers from feuding families
- Perhaps the most famous love story ever written
- Themes of love, fate, and family conflict
- "A rose by any other name would smell as sweet"

**Othello** (c. 1603)
- Moorish general destroyed by jealousy
- Manipulated by his ensign Iago
- Themes of jealousy, racism, and deception

**King Lear** (c. 1606)
- Aging king divides kingdom among daughters
- Explores madness, family, and justice
- One of Shakespeare's darkest tragedies

### Comedies

Light-hearted plays usually ending in marriage.

**A Midsummer Night's Dream** (c. 1595)
- Magical comedy set in Athens and enchanted forest
- Features fairies, love potions, and mistaken identities
- "The course of true love never did run smooth"

**Much Ado About Nothing** (c. 1598)
- Witty banter between Beatrice and Benedick
- Explores themes of love, honor, and deception

**The Merchant of Venice** (c. 1598)
- Complex play mixing comedy and serious themes
- Features the character Shylock
- "All that glisters is not gold"

**Twelfth Night** (c. 1601)
- Comedy of mistaken identity
- Twin siblings separated by shipwreck
- "Some are born great, some achieve greatness"

### Histories

Dramatizations of English kings and historical events.

**Henry V** (c. 1599)
- Young king leads England to victory at Agincourt
- Famous "St. Crispin's Day" speech
- Explores leadership and patriotism

**Richard III** (c. 1593)
- Villainous king's rise and fall
- "Now is the winter of our discontent"
- Complex portrayal of ambition and evil

**Henry IV Parts 1 & 2** (c. 1597-1598)
- Prince Hal's transformation to King Henry V
- Features the comic character Falstaff

## Shakespeare's Sonnets

Collection of 154 poems, mostly about love and beauty.

**Structure:**
- 14 lines in iambic pentameter
- Rhyme scheme: ABAB CDCD EFEF GG

**Famous Sonnets:**
- **Sonnet 18**: "Shall I compare thee to a summer's day?"
- **Sonnet 116**: "Let me not to the marriage of true minds"
- **Sonnet 130**: "My mistress' eyes are nothing like the sun"

## Shakespeare's Impact

### Language Innovation
Shakespeare invented approximately 1,700 words and many phrases still used today:

**Words:** assassination, bedroom, lonely, generous
**Phrases:**
- "Break the ice"
- "Wild goose chase"
- "Heart of gold"
- "Wear your heart on your sleeve"
- "Love is blind"

### Literary Influence
- Influenced every major writer who came after
- Explored universal themes: love, jealousy, ambition, revenge
- Created complex, psychologically realistic characters
- Mastered blank verse and poetic language

### Cultural Legacy
- Plays performed more than any other playwright's
- Translated into every major language
- Adapted into countless films, operas, and modern versions
- The Globe Theatre reconstructed in London
- Annual Shakespeare festivals worldwide

## Understanding Shakespeare

**Tips for Reading:**
- Don't worry about understanding every word
- Focus on the story and characters
- Read aloud - the plays were meant to be spoken
- Use footnotes and modern translations if needed
- Watch performances to see the plays come alive

**Themes to Look For:**
- Appearance vs. reality
- The nature of power and corruption
- Love in its many forms
- Revenge and justice
- Fate vs. free will
- The complexity of human nature
    `,
    quiz: [
      {
        question: 'Approximately how many plays did Shakespeare write?',
        options: [
          '25',
          '39',
          '50',
          '154'
        ],
        correctAnswer: 1,
        explanation: 'Shakespeare wrote approximately 39 plays during his career. He also wrote 154 sonnets and several other poems. The number 154 refers to his sonnets, not his plays.'
      },
      {
        question: 'Which famous line is from "Romeo and Juliet"?',
        options: [
          'To be or not to be',
          'A rose by any other name would smell as sweet',
          'Out, damned spot!',
          'Now is the winter of our discontent'
        ],
        correctAnswer: 1,
        explanation: '"A rose by any other name would smell as sweet" is from Romeo and Juliet. The other quotes are from: Hamlet ("To be or not to be"), Macbeth ("Out, damned spot!"), and Richard III ("Now is the winter of our discontent").'
      },
      {
        question: 'What type of play is "A Midsummer Night\'s Dream"?',
        options: [
          'Tragedy',
          'Comedy',
          'History',
          'Romance'
        ],
        correctAnswer: 1,
        explanation: '"A Midsummer Night\'s Dream" is one of Shakespeare\'s comedies. It\'s a light-hearted play featuring fairies, love potions, and mistaken identities, and it ends happily with multiple marriages.'
      },
      {
        question: 'In which play does the character of Iago appear?',
        options: [
          'Hamlet',
          'Macbeth',
          'Othello',
          'King Lear'
        ],
        correctAnswer: 2,
        explanation: 'Iago is a character in "Othello" where he serves as the villain who manipulates Othello and drives the tragic plot through deception and exploitation of jealousy.'
      },
      {
        question: 'How many lines does a Shakespearean sonnet have?',
        options: [
          '10',
          '12',
          '14',
          '16'
        ],
        correctAnswer: 2,
        explanation: 'A Shakespearean sonnet has 14 lines written in iambic pentameter with the rhyme scheme ABAB CDCD EFEF GG. Shakespeare wrote 154 sonnets in this format.'
      }
    ]
  }
};

export function TrendingTopicView({ topic, onClose }: TrendingTopicViewProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  if (!topic) {
    return null;
  }

  const content = topicContent[topic.title] || topicContent['Quantum Physics 101'];
  const quiz = content.quiz;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quiz[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setShowExplanation(false);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.length) * 100);

    return (
      <div className="min-h-screen bg-[#1E1B4B] p-4 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="bg-[#312E81] rounded-2xl p-8 border-2 border-[#06B6D4]/30 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👏' : '💪'}
            </motion.div>
            <h2 className="text-3xl text-white mb-2">Quiz Complete!</h2>
            <p className="text-xl text-[#06B6D4] mb-6">
              You scored {score} out of {quiz.length} ({percentage}%)
            </p>
            
            <div className="mb-8">
              <div className="w-full bg-[#1E1B4B] rounded-full h-4 mb-2">
                <motion.div
                  className="h-4 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            <p className="text-gray-300 mb-8">
              {percentage >= 80 
                ? 'Excellent work! You have a strong understanding of this topic! ⚡' 
                : percentage >= 60 
                  ? 'Good job! You have a solid grasp of the basics.' 
                  : 'Keep learning! Review the content and try again.'}
            </p>

            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={restartQuiz}
                className="px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-xl text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Retry Quiz
              </motion.button>
              <motion.button
                onClick={() => setShowQuiz(false)}
                className="px-6 py-3 bg-[#312E81] border-2 border-[#06B6D4] rounded-xl text-[#06B6D4]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Review Content
              </motion.button>
              <motion.button
                onClick={onClose}
                className="px-6 py-3 bg-transparent border-2 border-gray-500 rounded-xl text-gray-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Dashboard
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showQuiz) {
    const question = quiz[currentQuestion];
    const isAnswered = selectedAnswers[currentQuestion] !== undefined;
    const selectedAnswer = selectedAnswers[currentQuestion];

    return (
      <div className="min-h-screen bg-[#1E1B4B] p-4 lg:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Question {currentQuestion + 1} of {quiz.length}</span>
              <span>{Math.round(((currentQuestion + 1) / quiz.length) * 100)}%</span>
            </div>
            <div className="w-full bg-[#312E81] rounded-full h-2">
              <motion.div
                className="h-2 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            className="bg-[#312E81] rounded-2xl p-8 border-2 border-[#06B6D4]/30 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={currentQuestion}
          >
            <h3 className="text-2xl text-white mb-6">{question.question}</h3>

            <div className="space-y-3">
              {question.options.map((option: string, idx: number) => {
                const isCorrect = idx === question.correctAnswer;
                const isSelected = selectedAnswer === idx;
                
                let borderColor = 'border-[#06B6D4]/30';
                let bgColor = 'bg-[#1E1B4B]';
                
                if (isAnswered) {
                  if (isCorrect) {
                    borderColor = 'border-[#10B981]';
                    bgColor = 'bg-[#10B981]/20';
                  } else if (isSelected && !isCorrect) {
                    borderColor = 'border-[#EF4444]';
                    bgColor = 'bg-[#EF4444]/20';
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    onClick={() => !isAnswered && handleAnswerSelect(idx)}
                    className={`w-full p-4 rounded-xl border-2 ${borderColor} ${bgColor} text-left transition-all ${
                      !isAnswered ? 'hover:border-[#06B6D4] cursor-pointer' : 'cursor-default'
                    }`}
                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    disabled={isAnswered}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isAnswered && isCorrect 
                          ? 'border-[#10B981] bg-[#10B981]' 
                          : isAnswered && isSelected 
                            ? 'border-[#EF4444] bg-[#EF4444]' 
                            : 'border-gray-500'
                      }`}>
                        {isAnswered && (isCorrect || isSelected) && (
                          <span className="text-white text-sm">
                            {isCorrect ? '✓' : '✗'}
                          </span>
                        )}
                      </div>
                      <span className={`${
                        isAnswered && isCorrect 
                          ? 'text-[#10B981]' 
                          : isAnswered && isSelected 
                            ? 'text-[#EF4444]' 
                            : 'text-white'
                      }`}>
                        {option}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <motion.div
                className="mt-6 p-4 bg-[#1E1B4B] border-2 border-[#06B6D4]/50 rounded-xl"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <p className="text-sm text-[#06B6D4] mb-1">Explanation:</p>
                <p className="text-gray-300">{question.explanation}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <motion.button
              onClick={onClose}
              className="px-6 py-3 bg-transparent border-2 border-gray-500 rounded-xl text-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Exit Quiz
            </motion.button>

            {isAnswered && (
              <motion.button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-xl text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentQuestion < quiz.length - 1 ? 'Next Question' : 'See Results'} →
              </motion.button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Content Review View
  return (
    <div className="min-h-screen bg-[#1E1B4B]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#1E1B4B]/95 backdrop-blur-md border-b-2 border-[#06B6D4]/30">
        <div className="max-w-4xl mx-auto p-4 lg:p-6">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#312E81] border border-[#06B6D4]/50 text-[#06B6D4] hover:bg-[#06B6D4]/10 transition-colors"
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{topic.icon}</span>
                <div>
                  <h1 className="text-xl lg:text-2xl text-white">{topic.title}</h1>
                  <p className="text-sm text-gray-400">
                    <span className={`${
                      topic.difficulty === 'Beginner' 
                        ? 'text-[#10B981]' 
                        : topic.difficulty === 'Intermediate'
                          ? 'text-[#FBBF24]'
                          : 'text-[#F472B6]'
                    }`}>
                      {topic.difficulty}
                    </span> Level
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 lg:p-8 pb-32">
        <motion.div
          className="bg-[#312E81] rounded-2xl p-6 lg:p-10 border-2 border-[#06B6D4]/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="prose prose-invert max-w-none">
            {content.content.split('\n').map((line, idx) => {
              // H1
              if (line.startsWith('# ')) {
                return (
                  <motion.h1
                    key={idx}
                    className="text-3xl lg:text-4xl text-white mb-6 mt-8 first:mt-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    {line.replace('# ', '')}
                  </motion.h1>
                );
              }
              
              // H2
              if (line.startsWith('## ')) {
                return (
                  <motion.h2
                    key={idx}
                    className="text-2xl lg:text-3xl text-[#06B6D4] mb-4 mt-8 flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    <span className="w-2 h-8 bg-[#06B6D4] rounded-full glow-cyan" />
                    {line.replace('## ', '')}
                  </motion.h2>
                );
              }

              // H3
              if (line.startsWith('### ')) {
                return (
                  <motion.h3
                    key={idx}
                    className="text-xl lg:text-2xl text-[#F472B6] mb-3 mt-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    {line.replace('### ', '')}
                  </motion.h3>
                );
              }

              // Bold text
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <motion.p
                    key={idx}
                    className="text-[#FBBF24] mb-3 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    {line.replace(/\*\*/g, '')}
                  </motion.p>
                );
              }

              // Bullet points
              if (line.startsWith('- ')) {
                return (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-3 mb-2 ml-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#06B6D4] mt-2 flex-shrink-0" />
                    <p className="text-gray-300 flex-1">
                      {line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')}
                    </p>
                  </motion.div>
                );
              }

              // Code blocks
              if (line.startsWith('```')) {
                return null; // Skip code block markers for now
              }

              // Regular paragraph
              if (line.trim() && !line.startsWith('#')) {
                return (
                  <motion.p
                    key={idx}
                    className="text-gray-300 mb-4 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.02 }}
                    dangerouslySetInnerHTML={{
                      __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                    }}
                  />
                );
              }

              return null;
            })}
          </div>
        </motion.div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1E1B4B]/95 backdrop-blur-md border-t-2 border-[#06B6D4]/30 p-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3">
          <motion.button
            onClick={() => setShowQuiz(true)}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#8B5CF6] rounded-xl text-white flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Gamepad2 className="w-5 h-5" />
            <span>Start Quiz</span>
          </motion.button>
          <motion.button
            onClick={onClose}
            className="px-6 py-3 bg-transparent border-2 border-[#06B6D4] rounded-xl text-[#06B6D4]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Dashboard
          </motion.button>
        </div>
      </div>
    </div>
  );
}
