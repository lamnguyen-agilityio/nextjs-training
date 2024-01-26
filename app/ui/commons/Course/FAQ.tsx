// Components
import Accordion from '../Accordion';

// Interfaces
import { Section } from '@/app/lib/interfaces';

interface Props {
  sections: Section[];
}

const FAQ = ({ sections }: Props) => (
  <Accordion sections={sections} type="secondary" />
);

export default FAQ;
