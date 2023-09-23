import { useAppSelector } from '../../hooks';
import { getQuests } from '../../store/quests/selector';
import QuestCard from '../quest-card';

function QuestList(): JSX.Element {
  const quests = useAppSelector(getQuests);

  return (
    <div className="cards-grid">
      {quests && quests.map((quest) => <QuestCard quest={quest} key={quest.id} />)}
    </div>
  );
}

export default QuestList;
