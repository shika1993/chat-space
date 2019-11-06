require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
  #-------------保存できる場合--------------------
    it "text exists" do
      expect(build(:message, image: nil)).to be_valid
    end

    it "image exists" do
      expect(build(:message, text: nil)).to be_valid
    end

    it "text and image exist" do
      expect(build(:message)).to be_valid
    end
    #-------------保存できない場合--------------------
    it "text and image not exit1" do
      message = build(:message, text: nil, image: nil)
      message.valid?
      expect(message.errors[:text]).to include("を入力してください")
    end

    it "group_id not exit1" do
      message = build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end

    it "user_id not exit1" do
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end
  end
end
