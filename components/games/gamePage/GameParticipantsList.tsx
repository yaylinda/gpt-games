import useGamePageStore from '@/components/games/gamePage/store';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import GameParticipantItem from '@/components/games/gamePage/GameParticipantItem';

const GameParticipantsList = () => {
    const { participants } = useGamePageStore();

    return (
        <Card className="flex flex-grow">
            <CardHeader>
                <p>Game Participants</p>
            </CardHeader>
            <Divider />
            <CardBody className="p-2 gap-2">
                {participants.map((p) => (
                    <GameParticipantItem key={p.userId} participant={p} />
                ))}
            </CardBody>
            <Divider />
            <CardFooter></CardFooter>
        </Card>
    );
};

export default GameParticipantsList;
