import useGamePageStore from '@/components/games/gamePage/store';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';

const GameParticipantsList = () => {
    const { participants } = useGamePageStore();

    return (
        <Card className="flex flex-grow">
            <CardHeader>
                <p>Game Participants</p>
            </CardHeader>
            <Divider />
            <CardBody>
                {participants.map((p) => (
                    <GameParticipantItem />
                ))}
            </CardBody>
            <Divider />
            <CardFooter></CardFooter>
        </Card>
    );
};

export default GameParticipantsList;
