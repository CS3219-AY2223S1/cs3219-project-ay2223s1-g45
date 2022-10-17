import { createContext, useContext, useState } from 'react';

type MatchContextProps = {
  children: JSX.Element;
};

type Difficulty = {
  difficulty: 'easy' | 'medium' | 'hard' | '';
};

const MatchContext = createContext<any>({});

export function useMatch() {
  return useContext(MatchContext);
}

export default function MatchProvider({ children }: MatchContextProps) {
    const [difficulty, setDifficulty] = useState('' as unknown as Difficulty);

    const handleSelectedDifficulty = (selectedDifficulty: Difficulty) => {
        setDifficulty(selectedDifficulty);
    }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {
    difficulty,
    handleSelectedDifficulty
  };

  return <MatchContext.Provider value={context}>{children}</MatchContext.Provider>;
}
