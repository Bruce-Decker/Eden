const us_states = ['Alabama','Alaska','Arizona','Arkansas','California',
                   'Colorado','Connecticut','Delaware','Florida','Georgia',
                   'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas',
                   'Kentucky','Louisiana','Maine','Maryland','Massachusetts',
                   'Michigan','Minnesota','Mississippi','Missouri','Montana',
                   'Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
                   'New York','North Carolina','North Dakota','Ohio','Oklahoma',
                   'Oregon','Pennsylvania','Rhode Island','South Carolina',
                   'South Dakota','Tennessee','Texas','Utah','Vermont',
                   'Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { us_states };
export default getRandomInt;