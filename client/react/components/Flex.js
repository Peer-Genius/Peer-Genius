import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import stylesheet from 'react-jss';

const styles = {
	flex: {
		display: 'flex',
		flexDirection: props => props.column ? 'column' : props.direction,
		alignItems: props => props.align,
		justifyContent: props => props.justify,
		flexGrow: props => props.grow,
		flexShrink: props => props.shrink,
		flexBasis: props => props.basis
	}
};

const Flex =
	stylesheet(styles)(
		props => {
			// Destruct and take out extra props.
			let {
				className, classes, sheet,
				column, direction, align, justify, grow, shrink, basis,
				component: Component, rootRef,
				...componentProps
			} = props;
			
			return (
				<Component
					ref={rootRef}
					className={classNames(classes.flex, className)}
					{...componentProps}
				/>
			);
		}
	);

Flex.propTypes = {
	component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	column: PropTypes.bool,
	direction: PropTypes.string,
	align: PropTypes.string,
	justify: PropTypes.string,
	grow: PropTypes.number,
	shrink: PropTypes.number,
	basis: PropTypes.any
};

Flex.defaultProps = {
	component: 'div',
};

export default Flex;