import styles from './EditFeedback.module.css';
import BackButton from '../components/ui/BackButton';
import Body from '../components/ui/Body';
import { ReactComponent as ArrowDown } from '../assets/shared/icon-arrow-down.svg';
import { ReactComponent as PlusIcon } from '../assets/shared/icon-plus.svg';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DropdownItem from '../components/ui/DropdownItem';
import { useAuthContext } from '../context/AuthContext';

export default function EditFeedback() {
  const { state } = useLocation();
  const { feedback } = state;
  const { currentUser } = useAuthContext();

  const [title, setTitle] = useState(feedback?.title);
  const [category, setCategory] = useState(feedback?.category);
  const [status, setStatus] = useState(feedback?.status);
  const [description, setDescription] = useState(feedback?.description);
  const [titleError, setTitleError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);
  const [openStatusMenu, setOpenStatusMenu] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    title.trim() === '' && setTitleError(`Title can't be empty`);
    category === 'Feature' && setCategoryError('Please select the feature');
    description.trim() === '' &&
      setDescriptionError(`Description can't be empty`);
  };

  return (
    <>
      <nav className={styles.nav}>
        <BackButton></BackButton>
      </nav>
      <main className={styles.main}>
        <Body>
          <div className={styles.iconContainer}>
            <PlusIcon className={styles.plusIcon} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.titleContainer}>
              <h1 className={styles.h1}>Create New Feedback</h1>
              <label className={styles.label} htmlFor='title'>
                Feedback Title
              </label>
              <p>Add a short, descriptive headline</p>
              <input
                id='title'
                className={titleError && styles.errorFocus}
                value={title}
                maxLength='50'
                aria-invalid={Boolean(titleError)}
                aria-describedby='titleError'
                onChange={(event) => {
                  setTitleError('');
                  setTitle(event.target.value);
                }}
              />
              {titleError && (
                <p id='titleError' className={styles.error}>
                  {titleError}
                </p>
              )}
            </div>
            <label className={styles.label} htmlFor='category'>
              Category
            </label>
            <p>Choose a category for your feedback</p>
            <div className={styles.dropdownContainer}>
              <button
                id='category'
                className={`${styles.dropdownButton} ${
                  categoryError && styles.errorFocus
                }`}
                aria-invalid={Boolean(categoryError)}
                aria-describedby='categoryError'
                type='button'
                onClick={() => setOpenCategoryMenu((prev) => !prev)}
              >
                {category}
                <ArrowDown />
              </button>
              {openCategoryMenu && (
                <div
                  className={styles.dropdownMenu}
                  onClick={(event) => {
                    event.target.name !== 'Feature' && setCategoryError('');
                    setCategory(event.target.name);
                    setOpenCategoryMenu(false);
                  }}
                >
                  <DropdownItem selected={category}>Feature</DropdownItem>
                  <DropdownItem selected={category}>UI</DropdownItem>
                  <DropdownItem selected={category}>UX</DropdownItem>
                  <DropdownItem selected={category}>Enhancement</DropdownItem>
                  <DropdownItem selected={category}>Bug</DropdownItem>
                </div>
              )}
              {category && (
                <p id='categoryError' className={styles.error}>
                  {categoryError}
                </p>
              )}
            </div>
            <label className={styles.label} htmlFor='category'>
              Update Status
            </label>
            <p>Change feature state</p>
            <div className={styles.dropdownContainer}>
              <button
                id='category'
                className={`${styles.dropdownButton} ${
                  categoryError && styles.errorFocus
                }`}
                type='button'
                onClick={() => setOpenStatusMenu((prev) => !prev)}
              >
                {status}
                <ArrowDown />
              </button>
              {openStatusMenu && (
                <div
                  className={styles.dropdownMenu}
                  onClick={(event) => {
                    setStatus(event.target.name);
                    setOpenStatusMenu(false);
                  }}
                >
                  <DropdownItem selected={status}>Planned</DropdownItem>
                  <DropdownItem selected={status}>In-Progress</DropdownItem>
                  <DropdownItem selected={status}>Live</DropdownItem>
                </div>
              )}
            </div>
            <label className={styles.label} htmlFor='description'>
              Feedback Detail
            </label>
            <p>
              Include any specific comments on what should be improved, added,
              etc.
            </p>
            <textarea
              id='description'
              className={`${styles.textarea} ${
                descriptionError && styles.errorFocus
              }`}
              value={description}
              aria-invalid={Boolean(descriptionError)}
              aria-describedby='descriptionError'
              maxLength='300'
              onChange={(event) => {
                setDescriptionError('');
                setDescription(event.target.value);
              }}
            ></textarea>
            {descriptionError && (
              <p id='descriptionError' className={styles.error}>
                {descriptionError}
              </p>
            )}
            <button className={styles.submitButton} type='submit'>
              Add Feedback
            </button>
          </form>
          <button
            className={styles.cancelButton}
            onClick={(event) => navigate(-1)}
            type='button'
          >
            Cancel
          </button>
          <button
            className={styles.deleteButton}
            onClick={(event) => navigate(-1)}
            type='button'
          >
            Delete
          </button>
        </Body>
      </main>
    </>
  );
}