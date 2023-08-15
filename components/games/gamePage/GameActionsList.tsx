import GameActionItem from '@/components/games/gamePage/GameActionItem';
import useGamePageStore from '@/components/games/gamePage/store';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';

const GameActionsList = () => {
    const { actions } = useGamePageStore();

    return (
        <Card>
            <CardHeader>
                <p>Game Actions</p>
            </CardHeader>
            <Divider />
            <CardBody>
                {actions.map((a) => (
                    <GameActionItem key={a.id} action={a} />
                ))}
            </CardBody>
            <Divider />
            <CardFooter></CardFooter>
        </Card>
    );
};

export default GameActionsList;
