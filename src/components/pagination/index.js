import React, {useEffect} from 'react';
import classNames from 'classnames';
import Button from '@/components/UI/Button';
import useDebounce from '@/hooks/useDebounce';
import styles from './index.module.scss';

const Index = ({totalPages, currentPage, onPageChange}) => {
	const DOTS = '...';
	const debounceTiming = 500;

	useEffect(() => {
		if (currentPage > totalPages) {
			onPageChange(1);
		}
	}, [currentPage, totalPages, onPageChange]);

	const handlePrevPage = useDebounce(() => {
		currentPage > 1 && onPageChange(currentPage - 1);
	}, debounceTiming);

	const handleNextPage = useDebounce(() => {
		currentPage < totalPages && onPageChange(currentPage + 1);
	}, debounceTiming);

	const handleNumericChange = useDebounce(number => onPageChange(number), debounceTiming);

	const siblingCount = 1;

	const getPageNumbersToShow = () => {
		const pageNumbersToShow = [];

		if (totalPages <= 3) {
			for (let i = 1; i <= totalPages; i++) {
				pageNumbersToShow.push(i);
			}
		} else {
			const currentPageIdx = currentPage - 1;

			if (currentPage <= 2) {
				for (let i = 0; i < 3; i++) {
					pageNumbersToShow.push(i + 1);
				}
			} else if (currentPage >= totalPages - 1 - siblingCount) {
				for (let i = totalPages - 2 * siblingCount - 2; i < totalPages; i++) {
					pageNumbersToShow.push(i + 1);
				}
			} else {
				pageNumbersToShow.push(1);
				pageNumbersToShow.push(DOTS);

				for (let i = currentPageIdx - siblingCount; i <= currentPageIdx + siblingCount; i++) {
					pageNumbersToShow.push(i + 1);
				}
			}
		}

		return pageNumbersToShow;
	};

	useEffect(() => {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}, [currentPage]);

	return (
		<div className={styles.paginationWrapper}>
			<div className={styles.paginationContainer}>
				<Button
					design="secondary"
					className={styles.paginationItem}
					onClick={handlePrevPage}
					disabled={currentPage === 1}
				>
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
						<path
							d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
					</svg>
				</Button>
				{getPageNumbersToShow().map((pageNumber, key) => {
					if (pageNumber === DOTS) return <p key={`dots_${key}`}>{DOTS}</p>

					return (
						<Button
							key={key}
							design="secondary"
							className={classNames([
								styles.paginationItem,
								pageNumber === currentPage && styles.paginationItemActive
							])}
							onClick={() => handleNumericChange(pageNumber)}
						>
							{pageNumber}
						</Button>
					)
				})}
				<Button
					design="secondary"
					className={styles.paginationItem}
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
				>
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"
						 fill="rgb(var(--color-primary-blue))">
						<path
							d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
					</svg>
				</Button>
			</div>
		</div>
	);
};

export default Index;
