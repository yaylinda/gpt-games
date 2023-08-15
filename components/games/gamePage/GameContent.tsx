import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';

const GameContent = () => {
    return (
        <Card className="flex-grow">
            <CardHeader />
            <Divider />
            <CardBody></CardBody>
            <Divider />
            <CardFooter />
        </Card>
    );
};

export default GameContent;
