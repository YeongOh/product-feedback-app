import styles from './AddFeedback.module.css';
import BackButton from '../components/ui/BackButton';
import Body from '../components/ui/Body';
import { ReactComponent as ArrowDown } from '../assets/shared/icon-arrow-down.svg';
import { ReactComponent as PlusIcon } from '../assets/shared/icon-plus.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownItem from '../components/ui/DropdownItem';
import { useAuthContext } from '../context/AuthContext';
import { addFeedback } from '../api/firebase';

export default function AddFeedback() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Feature');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title.trim() === '') {
      setTitleError(`Title can't be empty`);
      return;
    }
    if (category === 'Feature') {
      setCategoryError('Please select the feature');
      return;
    }
    if (description.trim() === '') {
      setDescriptionError(`Description can't be empty`);
      return;
    }
    const id = await addFeedback(title, category, description, currentUser);
    return navigate(`/feedbacks/${id}`, { replace: true });
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
                onClick={() => setOpenMenu((prev) => !prev)}
              >
                {category}
                <ArrowDown />
              </button>
              {openMenu && (
                <div
                  className={styles.dropdownMenu}
                  onClick={(event) => {
                    event.target.name !== 'Feature' && setCategoryError('');
                    setCategory(event.target.name);
                    setOpenMenu(false);
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
            <div className={styles.footer}>
              <div>
                <button className={styles.submitButton} type='submit'>
                  Add Feedback
                </button>
              </div>
              <div>
                <button
                  className={styles.cancelButton}
                  onClick={(event) => navigate(-1)}
                  type='button'
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </Body>
      </main>
    </>
  );
}
