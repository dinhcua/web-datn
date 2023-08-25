import React from 'react';
import PropTypes from 'prop-types';
import Tree from 'react-animated-tree';
import './TreeView.scss';
import { Link } from 'react-router-dom';

TreeView.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string,
};

const treeStyles = {
    position: 'none',
    top: 40,
    left: 40,
    width: '100%',
};

function TreeView(props) {
    const { data, title } = props;

    return (
        <Tree content={title} canHide open style={treeStyles}>
            {data.map((e) => (
                <Tree
                    key={e.id}
                    content={
                        // <Link to={e.url}>
                        <Link onClick={e.action}>
                            {e.title} ({e.count})
                        </Link>

                        // </Link>
                    }
                    canHide
                >
                    {e.childrens.map((child) => (
                        <Tree
                            key={child.id}
                            content={
                                <Link onClick={child.action}>
                                    {child.title} ({child.count})
                                </Link>
                            }
                        />
                    ))}
                </Tree>
            ))}
        </Tree>
    );
}

export default TreeView;
