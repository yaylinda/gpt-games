import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';

const GameContent = () => {
    return (
        <Card className="flex-grow" isHoverable>
            <CardHeader>
                <p>GameContent</p>
            </CardHeader>
            <Divider />
            <CardBody />
            <Divider />
            <CardFooter></CardFooter>
        </Card>
    );
};

export default GameContent;
