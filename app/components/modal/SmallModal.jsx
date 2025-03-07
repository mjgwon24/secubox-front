"use client";

import { useState } from "react";
import { useAttack } from "@/app/AttackContext";
import { useModal } from "@/app/ModalContext";

export default function SmallModal({ onClose, name, check }) {
  const [trafficType, setTrafficType] = useState("");
  const [attackAmount, setAttackAmount] = useState("");
  const [botCount, setBotCount] = useState("");
  const { clickedAttackId, arrangeAttacks, setIsArranged } = useAttack();
  const { isDone, setDone } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsArranged(true);
    console.log("test");
    // TODO 여기에 제출 로직을 추가
    // console.log({ trafficType, attackAmount, botCount });
    onClose();
    setDone(false);
  };

  return (
    <>
      {!isDone ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="relative bg-[#292E30] p-6 rounded-lg w-full max-w-md border border-[#9C9C9C] z-[51]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-bold">
                {clickedAttackId}
              </h2>
              <button
                className="text-white text-2xl hover:text-gray-300"
                onClick={onClose}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="trafficType" className="block text-white mb-2">
                  트래픽 유형
                </label>
                <select
                  id="trafficType"
                  value={trafficType}
                  onChange={(e) => setTrafficType(e.target.value)}
                  required
                  className="w-full bg-[#292E30] text-white border border-[#9C9C9C] rounded px-3 py-2"
                >
                  <option value="">선택하세요</option>
                  <option value="ddos">SYN Flooding</option>
                  <option value="botnet">HTTP Flooding</option>
                </select>
              </div>
              <div>
                <label htmlFor="attackAmount" className="block text-white mb-2">
                  공격량(pps)
                </label>
                <input
                  type="number"
                  id="attackAmount"
                  value={attackAmount}
                  onChange={(e) => setAttackAmount(e.target.value)}
                  required
                  className="w-full bg-[#292E30] text-white border border-[#9C9C9C] rounded px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="botCount" className="block text-white mb-2">
                  봇 수
                </label>
                <input
                  type="number"
                  id="botCount"
                  value={botCount}
                  onChange={(e) => setBotCount(e.target.value)}
                  required
                  className="w-full bg-[#292E30] text-white border border-[#9C9C9C] rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#1B1B1B] text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={arrangeAttacks}
                >
                  save
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="relative bg-[#292E30] p-4 pb-6 rounded-lg w-full max-w-md border border-[#9C9C9C] z-[51]">
            {/* X 버튼을 오른쪽 정렬 */}
            <div className="flex justify-end">
              <button
                className="text-white text-2xl hover:text-gray-300 ml-auto"
                onClick={onClose}
              >
                ×
              </button>
            </div>

            <div className="text-white text-center pt-2 pb-4">
              <p className="text-lg font-semibold mb-2">준비중</p>
              <p className="text-sm text-gray-400">
                이 기능은 현재 개발 중입니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
