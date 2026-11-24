import { resortFaq } from '../data/resortFaq.js';

const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

export function getResortReply(message) {
  const text = normalize(message);
  const exact = resortFaq.find((item) => normalize(item.question) === text);
  if (exact) return exact.answer;
  if (/^(hi|hello|hey|good morning|good evening)$/.test(text)) {
    return 'Hello! Welcome to Resort Aruga. Ask about our cabanas, location, facilities, BBQ corner or bookings.';
  }
  if (/^(thanks|thank you|thank you very much)$/.test(text)) return 'You’re welcome! We look forward to welcoming you to Resort Aruga.';
  const matches = resortFaq.map((item) => ({
    item,
    score: item.keywords.reduce((total, keyword) => total + (` ${text} `.includes(` ${keyword} `) ? keyword.split(' ').length : 0), 0),
  })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score);
  if (matches.length) return matches[0].item.answer;
  return 'I don’t have a confirmed answer for that in our resort FAQs. Please use “Enquire about a stay” to contact the resort team, or choose one of the questions below.';
}
