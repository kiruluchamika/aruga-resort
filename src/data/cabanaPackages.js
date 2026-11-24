// Pricing and room counts are kept together for the package selector.
export const cabanaPricing = {
  currency: 'LKR',
  basis: 'per room per night',
  rooms: [
    {
      id: 'double',
      name: 'Double Room',
      count: 5,
      paragraphs: [
        'Settle into a private cabana and enjoy a relaxed coastal stay at Aruga Resort in Arugam Bay.',
        'Each cabana has its own attached bathroom and a beachfront view, giving you a comfortable base for your time by the sea.',
        'Choose room only, bed and breakfast, half board or full board to suit your plans. Compare the meal inclusions below before sending your enquiry.',
      ],
    },
    {
      id: 'family',
      name: 'Family Room',
      count: 3,
      paragraphs: [
        'Enjoy time together in a family cabana at Aruga Resort, surrounded by the peaceful coastal setting of Arugam Bay.',
        'An attached bathroom and beachfront view are included in every cabana. Ask our team to confirm the bed arrangement for your family when you enquire.',
        'Keep your meals flexible with room only, start the day with breakfast, or include more meals with half board or full board.',
      ],
    },
  ],
  packages: [
    { id: 'room-only', name: 'Room Only', description: 'Accommodation only. Meals are not included.', rates: { double: 18000, family: 24500 } },
    { id: 'bb', name: 'Bed & Breakfast', description: 'Accommodation and breakfast.', rates: { double: 19500, family: 26500 } },
    { id: 'half-board', name: 'Half Board', description: 'Accommodation, breakfast and dinner. Lunch is not included.', rates: { double: 28500, family: 44500 } },
    { id: 'full-board', name: 'Full Board', description: 'Accommodation, breakfast, lunch and dinner.', rates: { double: 44500, family: 58500 } },
  ],
};

export function formatCabanaRate(value) {
  return value == null ? 'Please enquire' : `${cabanaPricing.currency || ''} ${value.toLocaleString('en-US')}`.trim();
}
