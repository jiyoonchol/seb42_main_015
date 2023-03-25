package com.witchdelivery.messageapp.domain.member.controller;

import com.witchdelivery.messageapp.domain.member.dto.*;
import com.witchdelivery.messageapp.domain.member.mapper.MemberMapper;
import com.witchdelivery.messageapp.domain.member.entity.Member;
import com.witchdelivery.messageapp.domain.member.service.MemberDbService;
import com.witchdelivery.messageapp.domain.member.service.MemberService;
import com.witchdelivery.messageapp.global.response.PageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;

@RequestMapping("/sendy/users")
@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberDbService memberDbService;
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    /**
     * 사용자 등록(회원가입) 컨트롤러 메서드
     * @param memberPostDto
     * @return
     */
    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto) {
        memberService.createMember(memberPostDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * 이메일 중복 검증 컨트롤러 메서드
     * @param verifyEmailDto
     * @return
     */
    @PostMapping("/verify/email")
    public ResponseEntity postVerifyEmail(@Valid @RequestBody VerifyEmailDto verifyEmailDto) {
        memberDbService.verifiedExistedEmail(verifyEmailDto.getEmail());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 닉네임 중복 검증 컨트롤러 메서드
     * @param verifyNicknameDto
     * @return
     */
    @PostMapping("/verify/nickname")
    public ResponseEntity postVerifyNickname(@Valid @RequestBody VerifyNicknameDto verifyNicknameDto) {
        memberDbService.verifiedExistedName(verifyNicknameDto.getNickname());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 단일 사용자 조회(마이페이지) 컨트롤러 메서드
     * @param memberId
     * @return
     */
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") Long memberId) {
        MemberResponseDto memberResponseDto = memberService.findMember(memberId);
        return new ResponseEntity<>(memberResponseDto, HttpStatus.OK);
    }

    // 인터페이스 미구현 예정
    /**
     * 전체 사용자 조회 컨트롤러 메서드
     * @param page
     * @param size
     * @return
     */
    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam(required = false, defaultValue = "1") int page,
                                     @Positive @RequestParam(required = false, defaultValue = "20") int size) {
        Page<Member> members = memberService.findMembers(page -1, size);
        return new ResponseEntity<>(new PageResponseDto<>(memberMapper.membersToMemberResponseDtos(members.getContent()), members), HttpStatus.OK);
    }

    /**
     * 사용자 패스워드 변경 컨트롤러 메서드
     * @param memberId
     * @param patchPasswordDto
     * @return
     */
    @PatchMapping("/edit/password/{member-id}")
    public ResponseEntity patchPassword(@PathVariable("member-id") Long memberId,
                                        @Valid @RequestBody PatchPasswordDto patchPasswordDto) {
        patchPasswordDto.setMemberId(memberId);
        Member response = memberService.updatePassword(memberMapper.patchPasswordDtoToMember(patchPasswordDto));
        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(response), HttpStatus.OK);
    }

    /**
     * 사용자 닉네임 변경 컨트롤러 메서드
     * @param memberId
     * @param patchNicknameDto
     * @return
     */
    @PatchMapping("/edit/nickname/{member-id}")
    public ResponseEntity patchNickname(@PathVariable("member-id") Long memberId,
                                        @Valid @RequestBody PatchNicknameDto patchNicknameDto) {
        patchNicknameDto.setMemberId(memberId);
        Member response = memberService.updateNickname(memberMapper.patchNicknameDtoToMember(patchNicknameDto));
        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(response), HttpStatus.OK);
    }

    /**
     * 사용자 프로필 이미지 S3 업로드/수정 컨트롤러 메서드
     * @param memberId
     * @param multipartFile
     * @throws IOException
     */
    @PostMapping("/edit/profile/{member-id}")
    public ResponseEntity postProfileImage(@PathVariable("member-id") Long memberId,
                                           @RequestParam(value = "image") MultipartFile multipartFile) throws IOException {
        memberService.updateProfileS3(memberId, multipartFile);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 사용자 삭제(회원탈퇴) 컨트롤러 메서드
     * @param memberId
     * @return
     */
    @DeleteMapping("/delete/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") Long memberId) {
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}