// Ensure the container variable is not redeclared
const container = document.querySelector('#container');
const sidebar = document.querySelector('#sidebar');

const data = [
    {
        label: 'Part 1',
        type: '1',
        data: {
            Art: {
                points: [
                    'Are you good at art?',
                    'Did you learn art at school when you were a child?',
                    'What kind of art do you like?',
                    'Is art popular in your country?',
                    'Have you ever been to an art gallery?',
                    'Do you think children can benefit from going to art galleries?',
                ],
            },
            Birthdays: {
                points: [
                    'Do you enjoy your birthdays?',
                    'Do you usually celebrate your birthday?',
                    'What did you do on your last birthday?',
                    'Can you remember a birthday you enjoyed as a child?',
                    'Do most people celebrate their birthdays with a party in your country?',
                    'Which birthdays are considered important in your country?',
                ],
            },
            Clothes: {
                points: [
                    'Do you like clothes?',
                    'What kind of clothes do you usually wear?',
                    'Do you ever wear the traditional clothes of your country?',
                    'Where do you usually buy your clothes?',
                    'Have you ever worn a uniform?',
                    'Do most people in your country follow fashion?',
                ],
            },
            Computers: {
                points: [
                    'Do you often use a computer?',
                    'How do you usually get online?',
                    'Do you have your own computer?',
                    'What’s your favourite website?',
                    'Do you think children should be allowed unsupervised access to the internet?',
                ],
            },
            'Daily Routine': {
                points: [
                    'When do you usually get up in the morning?',
                    'Do you usually have the same routine every day?',
                    'What is your daily routine?',
                    'Do you ever change your routine?',
                    'Is your routine the same today as it was when you were a child?',
                    'Do you think it is important to have a daily routine?',
                ],
            },
            Dictionaries: {
                points: [
                    'Do you often use a dictionary?',
                    'What do you use dictionaries for?',
                    'What kinds of dictionaries do you think are most useful?',
                    'Do you think dictionaries are useful for learning a language?',
                    'What kind of information can you find in a dictionary?',
                ],
            },
            Education: {
                points: [
                    'What makes a good student?',
                    'What role should the teacher have in the classroom?',
                    'Do you think computers will one day replace teachers in the classroom?',
                    'How has teaching changed in your country in the last few decades?',
                    'What is the difference between the way children learn and the way adults learn?',
                    'How can a teacher make lessons for children more interesting?',
                ],
            },
            Evenings: {
                points: [
                    'What do you often do in the evenings?',
                    'Do you do the same thing every evening?',
                    'What is a popular activity for young people in your country in the evenings?',
                    'Do you ever work or study in the evenings?',
                ],
            },
            'Family & Friends': {
                points: [
                    'Do you spend much time with your family?',
                    'Who are you closest to in your family?',
                    'Do you prefer spending time with your family or friends?',
                    'Who is your best friend?',
                    'Are you still friends with people from your childhood?',
                    'Is family important in your country?',
                ],
            },
            Flowers: {
                points: [
                    'Do you like flowers?',
                    'What’s your favourite flower?',
                    'When was the last time you gave someone flowers?',
                    'Do any flowers have a special meaning in your country?',
                    'Why do you think women like flowers more than men?',
                ],
            },
            Food: {
                points: [
                    'What’s your favourite food?',
                    'Have you always liked the same food?',
                    'Is there any food you dislike?',
                    'What is a common meal in your country?',
                    'Do you have a healthy diet?',
                    'What do you think of fast food?',
                ],
            },
            'Going Out': {
                points: [
                    'Do you often go out in the evenings?',
                    'What do you like to do when you go out?',
                    'Do you prefer going out on your own or with friends?',
                    'What kinds of shops are there where you live?',
                    'Have you ever bought anything online?',
                    'Do you think men and women have different opinions about shopping?',
                ],
            },
            Hobbies: {
                points: [
                    'Do you have a hobby?',
                    'What equipment do you need for it?',
                    'Do you think hobbies should be shared with other people?',
                    'Did you have a hobby as a child?',
                    'What hobbies are popular in your country?',
                    'Why do you think people have hobbies?',
                ],
            },
            Internet: {
                points: [
                    'How often do you go online?',
                    'What do you use the internet for?',
                    'How do you get online?',
                    'Do you have your own computer?',
                    'What’s your favourite website?',
                    'Do you think children should be allowed unsupervised access to the internet?',
                ],
            },
            'Leisure Time': {
                points: [
                    'Do you have any hobbies or interests? [What are they?]',
                    'How did you become interested in (whatever hobby/interest the candidate mentions)?',
                    'What is there to do in your free time in (candidate’s home town/village)?',
                    'How do you usually spend your holidays?',
                    'Is there anywhere you would particularly like to visit? [Why?]',
                ],
            },
            'Your Favourite Place': {
                points: [
                    'What place do you most like to visit?',
                    'How often do you visit this place?',
                    'Why do you like it so much?',
                    'Is it popular with many other people?',
                    'Has it changed very much since you first went there? [In what way?]',
                ],
            },
            'Leisure': {
                points: [
                    'Do you have any hobbies or interests? [What are they?]',
                    'How did you become interested in (whatever hobby/interest the candidate mentions)?',
                    'What is there to do in your free time in (candidate’s home town/village)?',
                    'How do you usually spend your holidays?',
                    'Is there anywhere you would particularly like to visit? [Why?]',
                ],
            },
            'Family_': {
                points: [
                    'Describe someone in your family who you really admire. You should say: ',
                    'who he/she is',
                    'what relation you have with him /her',
                    'what you do together',
                    'and explain why do you admire this person.',
                ],
            },
        ];

data.forEach((section) => {
    const { label, type, data } = section;

    switch (type) {
        case '1':
            render(label, processPart1(data));

            break;
        case '2':
            renderSidebar(label, processPart2(data));

            break;
        case '3':
            renderSidebar(label, processPart3(data));

            break;
    }
});

function processPart1(data) {
    const result = {};
    const topics = _.shuffle(Object.keys(data))
        .slice(0, 3);

    topics.forEach((topic) => {
        const q = _.shuffle(data[topic].points)
            .slice(0, 4);

        result[topic] = {
            points: q,
        };
    });

    return result;
}

function processPart2(data) {
    const result = {};
    const topic = _.shuffle(Object.keys(data))
        .slice(0, 1);

    result[topic] = {
        question: data[topic].question,
        points: data[topic].points,
    };

    return result;
}

function processPart3(data) {
    const result = {};
    const topic = _.shuffle(Object.keys(data))
        .slice(0, 1);

    result[topic] = {
        points: data[topic].points,
    };

    return result;
}

function render(sectionTitle = '', data = []) {
    container.insertAdjacentHTML('beforeend', `
            <h2>${sectionTitle}</h2>
            <ul>
              ${Object.keys(data)
            .map((topic) => {
                const topicTitle = data[topic].question ? `${topic}. ${data[topic].question}` : topic;
                const points = data[topic].points.map((i) => `<li>${i}</li>`)
                    .join('\n');

                return `
                          <li>
                            ${topicTitle}
                            <ul>${points}</ul>
                          </li>
                        `;
            })
            .join('\n')}
            </ul>`);
}

function renderSidebar(sectionTitle = '', data = []) {
    sidebar.insertAdjacentHTML('beforeend', `
            <h2>${sectionTitle}</h2>
            <ul>
              ${Object.keys(data)
            .map((topic) => {
                const topicTitle = data[topic].question ? `${topic}. ${data[topic].question}` : topic;
                const points = data[topic].points.map((i) => `<li>${i}</li>`)
                    .join('\n');

                return `
                          <li>
                            ${topicTitle}
                            <ul>${points}</ul>
                          </li>
                        `;
            })
            .join('\n')}
            </ul>`);
}
  