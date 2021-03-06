import type { Children } from 'react';

import { Header } from '../components/containers';

type Props = {
    children: Children
};

const LayoutConnector = ({
    children,
}: Props) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

export default LayoutConnector;
