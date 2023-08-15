import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';

const GameParticipantsList = () => {
    return (
        <Card isHoverable>
            <CardHeader>
                <p>Game Participants</p>
            </CardHeader>
            <Divider />
            <CardBody />
            <Divider />
            <CardFooter></CardFooter>
        </Card>
    );
};

export default GameParticipantsList;
