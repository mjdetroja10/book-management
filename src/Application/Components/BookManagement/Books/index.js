"use client";
import { BOOK_DATA } from "@/Application/Constants/BookConstant";
import { MultiSelectController } from "@/Application/controllers/MultiSelectController";
import { SelectController } from "@/Application/controllers/SelectController";
import { useCallback, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

const addNewBook = (append, setBookOptions, bookValue, bookOptions) => () => {
  let isEmptyField = Object.values(bookValue).some(
    (x) => x.bookName === "" || (Array.isArray(x.bookChapters) && x.bookChapters.length === 0)
  );

  if (!isEmptyField && bookOptions[BOOK_DATA.length - 1]?.length !== 1) {
    append({ bookName: "", bookChapters: [] });

    setBookOptions((prev) =>
      prev.concat([
        prev[prev.length - 1].filter((item) => bookValue.findIndex((book) => book.bookName === item.value) === -1),
      ])
    );
  }
};

export const BookStore = ({ setBooks }) => {
  const [bookOptions, setBookOptions] = useState([
    BOOK_DATA.map((book) => ({ value: book.id, label: book.title })) ?? [],
  ]);
  const methods = useForm({
    defaultValues: {
      books: [{ bookName: "", bookChapters: [] }],
    },
  });

  const { watch, handleSubmit, control } = methods;

  const { fields, append } = useFieldArray({ control, name: "books" });

  const bookValue = watch("books");

  // const bookOptions = useMemo(() => BOOK_DATA.map((book) => ({ value: book.id, label: book.title })), []);

  const chapterOptions = useCallback(
    (name) => {
      if (watch(name)) {
        let bookValue = watch(name);
        let chapters = BOOK_DATA.find((book) => book.id === bookValue)?.chapters;

        return chapters && chapters.length > 0 ? chapters.map((x) => ({ label: x.title, value: x.word_count })) : [];
      }
      return [];
    },
    [watch]
  );

  return (
    <div className="px-2 py-4 border-2 border-gray-200 mb-8">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit((data) => setBooks(data))}>
          {fields.map((field, idx) => (
            <div className="grid grid-cols-2 gap-8 mb-4" key={field.id}>
              <div>
                <SelectController name={`books[${idx}].bookName`} options={bookOptions[idx]} />
              </div>
              <div>
                <MultiSelectController
                  name={`books[${idx}].bookChapters`}
                  options={chapterOptions(`books[${idx}].bookName`)}
                  getOptionLabel={(option) => `${option?.label} (${option?.value} No of Words)`}
                />
              </div>
            </div>
          ))}

          <div className="my-2">
            <button
              type="submit"
              className="px-2 py-1  text-black border-2 border-black rounded-md mr-3"
              onClick={addNewBook(append, setBookOptions, bookValue, bookOptions)}
            >
              Add Book
            </button>
            <button type="submit" className="px-2 py-1 bg-blue-400 text-white rounded-md">
              Next
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
